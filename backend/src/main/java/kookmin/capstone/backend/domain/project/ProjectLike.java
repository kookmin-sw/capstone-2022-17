package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @NoArgsConstructor
public class ProjectLike {

    public ProjectLike(User user, Project project) {
        this.user = user;
        this.project = project;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
