package kookmin.capstone.backend.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SecurityConfigTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("암호화 테스트")
    void testEncode() {
        String password = "1111";

        String enPw = passwordEncoder.encode(password);

        System.out.println("enPw = " + enPw);

        boolean matchResult = passwordEncoder.matches(password, enPw);

        System.out.println("matchResult = " + matchResult);
    }
}