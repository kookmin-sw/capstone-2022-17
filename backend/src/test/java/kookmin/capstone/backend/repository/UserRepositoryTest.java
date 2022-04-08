package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertDumies() {

        IntStream.rangeClosed(1, 100).forEach(i -> {
            User user = User.builder()
                    .email("user" + i + "@test.com")
                    .name("사용자" + i)
                    .fromSocial(false)
                    .password(passwordEncoder.encode("1111"))
                    .build();
            user.addUserRole(UserRole.USER);
            userRepository.save(user);
        });
    }

    @Test
    public void testRead() {
        Optional<User> result = userRepository.findByEmail("user2@test.com", false);
        User user = result.get();

        System.out.println("user = " + user);
    }

}