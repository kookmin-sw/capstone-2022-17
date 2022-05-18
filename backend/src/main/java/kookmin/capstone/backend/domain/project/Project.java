package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.DateEntity;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.thymeleaf.util.StringUtils;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static org.thymeleaf.util.StringUtils.isEmpty;

@Entity
@Getter @SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Project extends DateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private String thumbnail;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_status")
    private ProjectStatus status;

    @Column(name = "project_title")
    private String title;
    private String purpose;
    private String field;
    private String region;

    private Long score;
    private int likes;
    private int views;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ProjectPosition> positions = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ProjectTech> techStack = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Member> members = new ArrayList<>();



    public void chageProject(String description, String thumbnail, ProjectStatus status,
                             String title, String purpose, String field, String region
                             ) {
        this.description = description;
        this.thumbnail = thumbnail;
        this.status = status;
        this.title = title;
        this.purpose = purpose;
        this.field = field;
        this.region = region;
    }

    public void addViews() {
        this.views++;
    }

    public void like() {
        this.likes++;
    }

    public void unlike() {
        this.likes--;
    }

    //연관 관계 메서드
    public void addTechStack(ProjectTech stack) {
        techStack.add(stack);
        stack.registToProject(this);
    }

    public void addPosition(ProjectPosition position) {
        positions.add(position);
        position.registProject(this);
    }

    public void initTechStack(List<ProjectTech> techStack) {
        this.techStack = techStack;
    }

    public void initPosition(List<ProjectPosition> positions) {
        this.positions = positions;
        for (ProjectPosition projectPosition : positions) {
            projectPosition.registProject(this);
            projectPosition.getPosition().registProjectPosition(projectPosition);
        }
    }

    //생성 메서드
}
