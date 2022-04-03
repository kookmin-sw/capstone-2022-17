package kookmin.capstone.backend.api;

import kookmin.capstone.backend.dto.JwtRequestDto;
import kookmin.capstone.backend.dto.MemberSignupRequestDto;
import kookmin.capstone.backend.service.auth.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthApiController {

    private final AuthService authService;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public String login(@RequestBody JwtRequestDto request) {
        try {
            return authService.login(request);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public String signup(@RequestBody MemberSignupRequestDto request) {
        return authService.signup(request);
    }
}
