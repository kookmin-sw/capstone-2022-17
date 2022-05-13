package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.authDTO.SignupDTO;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
