package kookmin.capstone.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String nickname;
    private String password;
    private String phoneNumber;
    private String avatar;
    private String address;
    private Float rating;
    private String instaId;
    private String blog;

    private String techStack;
    private String position;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;
}
