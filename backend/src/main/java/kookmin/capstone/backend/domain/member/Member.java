package kookmin.capstone.backend.domain.member;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Member {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public void changeMember(User user, Project project) {
        this.user = user;
        this.project = project;

        user.getMembers().add(this);
        project.getMembers().add(this);
    }
}
