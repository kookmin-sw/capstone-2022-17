package kookmin.capstone.backend.domain.user;

import kookmin.capstone.backend.domain.Portfolio;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.MemberSignupRequestDto;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Override
    public String toString() {
        return "email: " + getEmail() + ", name: " + getName() + ", social: " + isFromSocial();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String nickname;
    private String name;
    private String password;
    private String avatar;
    private String address;
    private Float rating;
    private String instaId;
    private String blog;

    private boolean fromSocial;

    private String techStack;
    private String position;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<UserRole> roleSet = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    public User(MemberSignupRequestDto request) {
        email = request.getEmail();
        password = request.getPassword();
        name = request.getName();
    }

    public void addUserRole(UserRole role) {
        roleSet.add(role);
    }

    public void encryptPassword(PasswordEncoder passwordEncoder) {
        password = passwordEncoder.encode(password);
    }
}
