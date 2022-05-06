package kookmin.capstone.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter @Setter
@ToString
public class UserAuthDto extends User {

    private String email;

    private String name;

    private boolean fromSocial;

    public UserAuthDto(String username, String password,
                       boolean fromSocial,
                       Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.email = username;
        this.fromSocial = fromSocial;
    }
}
