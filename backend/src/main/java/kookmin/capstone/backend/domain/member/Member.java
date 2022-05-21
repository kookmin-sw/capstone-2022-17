package kookmin.capstone.backend.domain.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.Notification;
import kookmin.capstone.backend.domain.Position;
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
    @Column(name = "member_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "position_id")
    private Position position;

    @OneToOne(fetch = LAZY, mappedBy = "member", cascade = CascadeType.ALL)
    private Notification notification;

    public void notifyChanged(Notification notification) {
        this.notification = notification;
        notification.setMember(this);

    }

    public void changeMember(User user, Project project) {
        this.user = user;
        this.project = project;

        user.getMembers().add(this);
        project.getMembers().add(this);
    }

    public void updateMember(MemberType memberType) {
        this.memberType = memberType;
    }
}
