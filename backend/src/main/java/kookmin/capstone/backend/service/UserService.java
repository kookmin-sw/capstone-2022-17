package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserPosition;
import kookmin.capstone.backend.domain.user.UserTech;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.authDTO.SignupDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import kookmin.capstone.backend.dto.userDTO.UserTechDTO;
import kookmin.capstone.backend.repository.UserPositionRepository;
import kookmin.capstone.backend.repository.UserRepository;
import kookmin.capstone.backend.repository.UserTechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
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

    @Transactional
    public User join(SignupDTO signupDTO) {
        User user = userRepository.save(User.builder()
                .email(signupDTO.getEmail())
                .password(passwordEncoder.encode(signupDTO.getPassword()))
                .nickname(signupDTO.getNickname())
                .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
                .build());
        return user;
    }

    @Transactional
    public UserDTO updateUser(UserDTO userDTO) {
        User findUser = userRepository.findById(userDTO.getId()).orElseThrow(EntityNotFoundException::new);

        findUser.update(userDTO.getNickname(), userDTO.getAvatar(), userDTO.getInstaId(),
                userDTO.getBlog(), userDTO.getGithub());

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

    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existUserByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public Optional<User> findUser(String email) {
        return userRepository.findByEmail(email);
    }


}
