package kookmin.capstone.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.Portfolio;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.MemberSignupRequestDto;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Override
    public String toString() {
        return "email: " + getEmail() + ", social: " + isFromSocial();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String nickname;
    private String password;
    private String avatar;
    private String address;
    private Float rating;
    private String instaId;
    private String blog;

    private boolean fromSocial;

    private String techStack;
    private String position;

//    @Enumerated(EnumType.STRING)
//    @ElementCollection(fetch = FetchType.LAZY)
//    @Builder.Default
//    private Set<UserRole> roleSet = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    public User(MemberSignupRequestDto request) {
        email = request.getEmail();
        password = request.getPassword();
//        name = request.getName();
    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return this.roleSet.stream()
//                .map(role -> new SimpleGrantedAuthority
//                        ("ROLE_" + role.name())).collect(Collectors.toSet());
//    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    public void addUserRole(UserRole role) {
//        roleSet.add(role);
//    }

}
