package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserRole;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.IntStream;

import static kookmin.capstone.backend.repository.UserRepositoryTest.APPLICATION_LOCATIONS;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(properties = APPLICATION_LOCATIONS)
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertDumies() {

        IntStream.rangeClosed(1, 10).forEach(i -> {
            User user = User.builder()
                    .email("user" + i + "@test.com")
                    .name("사용자" + i)
                    .fromSocial(false)
                    .password(passwordEncoder.encode("1111"))
                    .roles(Collections.singletonList("ROLE_USER"))
                    .build();
//            user.addUserRole(UserRole.USER);
            userRepository.save(user);
        });
    }

    @Test
    void findUserByNickName() {
        String target = "개미";

        Optional<User> findUser = userRepository.findUser(target);
        System.out.println(findUser.get().getName());
        Assertions.assertThat(findUser.get().getNickname()).isEqualTo(target);
    }

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:application-aws.yml";
}