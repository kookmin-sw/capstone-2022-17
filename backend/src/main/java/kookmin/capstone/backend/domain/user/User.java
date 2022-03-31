package kookmin.capstone.backend.domain.user;

import kookmin.capstone.backend.domain.Portfolio;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.MemberSignupRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

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

    private String techStack;
    private String position;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    public User(MemberSignupRequestDto request) {
        email = request.getEmail();
        password = request.getPassword();
        name = request.getName();
    }

    public void encryptPassword(PasswordEncoder passwordEncoder) {
        password = passwordEncoder.encode(password);
    }
}
