package kookmin.capstone.backend.domain.member;

import kookmin.capstone.backend.domain.Project;
import kookmin.capstone.backend.domain.User;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Member {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
