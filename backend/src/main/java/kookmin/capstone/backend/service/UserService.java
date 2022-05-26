package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserPosition;
import kookmin.capstone.backend.domain.user.UserTech;
import kookmin.capstone.backend.dto.authDTO.AuthRequestDTO;
import kookmin.capstone.backend.dto.authDTO.LoginDTO;
import kookmin.capstone.backend.dto.authDTO.response.ErrorResponse;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.authDTO.SignupDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import kookmin.capstone.backend.dto.userDTO.UserTechDTO;
import kookmin.capstone.backend.repository.MemberRepository;
import kookmin.capstone.backend.repository.UserPositionRepository;
import kookmin.capstone.backend.repository.UserRepository;
import kookmin.capstone.backend.repository.UserTechRepository;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserTechRepository userTechRepository;
    private final UserPositionRepository userPositionRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;

    private final FastApiUserService fastApiUserService;
    private final FastApiProjectService fastApiProjectService;

    @Transactional
    public AuthRequestDTO join(SignupDTO signupDTO) {
        User user = userRepository.save(User.builder()
                .email(signupDTO.getEmail())
                .password(passwordEncoder.encode(signupDTO.getPassword()))
                .nickname(signupDTO.getNickname())
                .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
                .build());
        String token = jwtTokenService.createToken(user.getEmail(), user.getId(), user.getRoles());
        AuthRequestDTO authRequestDTO = AuthRequestDTO.entityToDto(user, token);
        fastApiUserService.createUser(authRequestDTO);
        return authRequestDTO;
    }

    @Transactional
    public UserDTO updateUser(UserDTO userDTO, Long userId) {
        User findUser = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        List<String> userStack = userDTO.getUserTechList().stream().map(e -> e.getUserTech()).collect(Collectors.toCollection(ArrayList::new));
        //TODO
        List<String> userPosition = userDTO.getUserPositionSet().stream().map(e -> e.getPositionName()).collect(Collectors.toCollection(ArrayList::new));
        List<UserTech> savedStack = findUser.getTechStack();

        Iterator<UserTech> iter = savedStack.iterator();
        while(iter.hasNext()) {
            UserTech userTech = iter.next();
            if (!userStack.contains(userTech.getStack())) {
                userTech.deleteUser(iter);
                userTechRepository.deleteById(userTech.getId());
            } else {
                userStack.remove(userTech.getStack());
            }
        }

        userStack.stream().forEach(stack -> findUser.addTechStack(new UserTech(stack)));
        fastApiUserService.updateUserTech(userId, findUser.getTechStack().stream().map(e -> e.getStack()).collect(Collectors.toCollection(ArrayList::new)));

        findUser.update(userDTO.getNickname(), userDTO.getAvatar(), userDTO.getInstaId(),
                userDTO.getBlog(), userDTO.getGithub(), userDTO.getIntroduce());
        userDTO.setId(findUser.getId());
        return userDTO;
    }

    @Transactional
    public UserDTO updateUserTech(List<String> userTechList, Long userId) {
        User findUser = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        List<UserTech> findUserTechList = findUser.getTechStack();

        Iterator<UserTech> iter = findUserTechList.iterator();
        while(iter.hasNext()) {
            UserTech userTech = iter.next();
            if (!userTechList.contains(userTech.getStack())) {
                userTech.deleteUser(iter);
                userTechRepository.deleteById(userTech.getId());
            } else {
                userTechList.remove(userTech.getStack());
            }
        }

        userTechList.stream().forEach(stack -> findUser.addTechStack(new UserTech(stack)));
        return UserDTO.entityToDto(findUser);
    }

    @Transactional
    public UserDTO updateUserPosition(Set<UserPositionDTO> userPositionList, Long userId) {
        User findUser = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        Set<UserPosition> findUserPositionList = findUser.getUserPositions();

        Iterator<UserPosition> iter = findUserPositionList.iterator();
        while(iter.hasNext()) {
            UserPosition userPosition = iter.next();
            if (!userPositionList.contains(userPosition.getPositionName())) {
                userPosition.deleteUser(iter);
                userPositionRepository.deleteById(userPosition.getId());
            } else {
                userPositionList.remove(userPosition.getPositionName());
            }
        }

        userPositionList.stream().forEach(position -> findUser.addUserPosition(new UserPosition(position.getScore(), position.getPositionName())));
        return UserDTO.entityToDto(findUser);
//        return UserDTO.builder().build();

    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public UserDTO findUserDTOById(Long id) {
        User findUser = userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return UserDTO.entityToDto(findUser);
    }

    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existUserByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public Optional<User> findUser(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDTO> findRecommendUser(Long projectId) {
        List<Long> allMemberType = memberRepository.findAllMemberType(projectId);
        List<Long> userIds = fastApiProjectService.getRecommendUser(projectId, 10)
                .stream().filter(e -> !allMemberType.contains(e)).collect(Collectors.toCollection(ArrayList::new));

        return userRepository.findRecommend(userIds).stream().map(e -> UserDTO.entityToDto(e))
                .collect(Collectors.toCollection(ArrayList::new));
    }

}
