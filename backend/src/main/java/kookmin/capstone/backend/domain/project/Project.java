package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.DateEntity;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ProjectTech> techStack = new ArrayList<>();

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

    //연관 관계 메서드
    public void addTechStack(ProjectTech stack) {
        techStack.add(stack);
        stack.registToProject(this);
    }

    public void initTechStack(List<ProjectTech> techStack) {
        this.techStack = techStack;
    }

    //생성 메서드
//    public static Project createProject() {
//        return null;
//    }

}
