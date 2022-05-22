package kookmin.capstone.backend.domain.user;

import kookmin.capstone.backend.domain.portfolio.Portfolio;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.dto.memberDTO.MemberSignupRequestDto;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
    private Float rating;
    private String instaId;
    private String blog;
    private String github;
    private String introduce;

    private boolean fromSocial;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserTech> techStack = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserPosition> userPositions = new HashSet<>();

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

    @OneToMany(mappedBy = "user")
    private List<Member> members = new ArrayList<>();

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

    public void update(String nickname, String avatar, String instaId, String blog,
                       String github, String introduce) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.instaId = instaId;
        this.blog = blog;
        this.github = github;
        this.introduce = introduce;
    }

    public void updateTech(List<UserTech> userTechList) {
        this.techStack = userTechList;
    }

    public void addTechStack(UserTech stack) {
        techStack.add(stack);
        stack.registToUser(this);
    }

    public void addUserPosition(UserPosition userPosition) {
        userPositions.add(userPosition);
        userPosition.registToUser(this);
    }

}
