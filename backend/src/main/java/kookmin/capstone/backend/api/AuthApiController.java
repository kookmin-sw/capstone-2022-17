package kookmin.capstone.backend.api;

import io.swagger.annotations.*;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.UserDTO;
import kookmin.capstone.backend.dto.authDTO.AuthApiResponse;
import kookmin.capstone.backend.dto.authDTO.LoginDTO;
import kookmin.capstone.backend.dto.authDTO.SignupDTO;
import kookmin.capstone.backend.jwt.JwtTokenProvider;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Api(tags = {"유저 API"})
@AllArgsConstructor
public class AuthApiController {


    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    // 회원가입
    @PostMapping("/join")
    @ApiOperation(value = "회원가입, eamil과 password 보내주면 됨")
    public String join(@RequestBody SignupDTO signupDTO) {
        User member = userRepository.save(User.builder()
                .email(signupDTO.getEmail())
                .password(passwordEncoder.encode(signupDTO.getPassword()))
                .nickname(signupDTO.getNickname())
                .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
                .build());
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public String login(@RequestBody LoginDTO userDTO) {
        User member = userRepository.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!passwordEncoder.matches(userDTO.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }




}
