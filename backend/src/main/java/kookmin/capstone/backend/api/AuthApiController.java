package kookmin.capstone.backend.api;

import io.swagger.annotations.*;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.authDTO.response.*;
import kookmin.capstone.backend.dto.authDTO.LoginDTO;
import kookmin.capstone.backend.dto.authDTO.SignupDTO;
import kookmin.capstone.backend.exception.authException.ExistNicknameException;
import kookmin.capstone.backend.exception.authException.ExistUserException;
import kookmin.capstone.backend.exception.authException.PasswordException;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import kookmin.capstone.backend.repository.UserRepository;
import kookmin.capstone.backend.service.UserService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@Api(tags = {"로그인/회원가입 API"})
@RequiredArgsConstructor
public class AuthApiController {


    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    // 회원가입
    @PostMapping("/join")
    @ApiOperation(value = "회원가입, eamil과 password 보내주면 됨")
    public ResponseEntity<?> join(@Validated @RequestBody SignupDTO signupDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
            // 200 response with 404 status code
            //return ResponseEntity.ok(new ErrorResponse("404", "Validation failure", errors));
            // or 404 request
              return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
        }
        try {
            if (userService.existUserByEmail(signupDTO.getEmail().strip())) {
                ExistUserException e = new ExistUserException("이미 존재 하는 회원입니다.");
                throw e;
            } else if (!signupDTO.getPassword().equals(signupDTO.getRepassword())) {
                PasswordException e = new PasswordException("비밀번호 확인이 틀렸습니다.");
                throw e;
            } else if (userService.existUserByNickname(signupDTO.getNickname().strip())) {
                ExistNicknameException e = new ExistNicknameException("이미 있는 닉네임 입니다.");
                throw e;
            }

        }catch (ExistUserException e){
            return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", e.getMessage()));
        } catch (PasswordException e){
            return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", e.getMessage()));
        } catch (ExistNicknameException e){
            return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", e.getMessage()));
        }
        User user = userService.join(signupDTO);
        return ResponseEntity.ok(ResponseDTO.builder().
                email(user.getEmail()).
                nickname(user.getNickname()).
                userId(user.getId()).
                accessToken(jwtTokenService.createToken(user.getUsername(), user.getId(), user.getRoles()))
                .build());
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<?> login(@RequestBody LoginDTO userDTO) {
        User user = null;
        try {
            user = userService.findUser(userDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));

            if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("잘못된 비밀번호입니다.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", e.getMessage()));
        }

        return ResponseEntity.ok(ResponseDTO.builder().
                email(user.getEmail()).
                nickname(user.getNickname()).
                userId(user.getId()).
                accessToken(jwtTokenService.createToken(user.getUsername(), user.getId(), user.getRoles()))
                .build());
    }

}
