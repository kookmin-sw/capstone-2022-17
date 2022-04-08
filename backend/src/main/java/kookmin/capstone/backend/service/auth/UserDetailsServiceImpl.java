package kookmin.capstone.backend.service.auth;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.UserAuthDto;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("loadUserByUsername " + username);
        Optional<User> result = userRepository.findByEmail(username, false);
        if(result.isEmpty()) {
            throw new UsernameNotFoundException("이메일을 확인 하거나 소셜 계정을 확인하세요.");
        }

        User user = result.get();
        log.info(user.getEmail());

        UserAuthDto userAuthDto = new UserAuthDto(
                user.getEmail(),
                user.getPassword(),
                user.isFromSocial(),
                user.getRoleSet().stream()
                        .map(role -> new SimpleGrantedAuthority
                                ("ROLE_" + role.name())).collect(Collectors.toSet()));
        userAuthDto.setName(user.getName());
        userAuthDto.setFromSocial(user.isFromSocial());

        return userAuthDto;
    }
}