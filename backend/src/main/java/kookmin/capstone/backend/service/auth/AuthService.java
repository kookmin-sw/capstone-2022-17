package kookmin.capstone.backend.service.auth;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.JwtRequestDto;
import kookmin.capstone.backend.dto.MemberSignupRequestDto;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public String signup(MemberSignupRequestDto request) {
        boolean existMember = userRepository.existsByEmail(request.getEmail());

        // 이미 회원이 존재하는 경우
        if (existMember) return null;

        User user = new User(request);
        user.encryptPassword(passwordEncoder);

        userRepository.save(user);
        return user.getEmail();
    }


    public String login(JwtRequestDto request) throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();
        return principal.getUsername();
    }
}