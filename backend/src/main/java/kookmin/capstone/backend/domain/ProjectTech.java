package kookmin.capstone.backend.domain;

import kookmin.capstone.backend.domain.project.Project;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ProjectTech {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_tech_id")
    private Long id;

    private String stack;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public void registToProject(Project project) {
        this.project = project;
    }

//    public static ProjectTech registTech(String stack, Project project) {
//        ProjectTech projectTech = new ProjectTech();
//
//        return ProjectTech;
//    }


    public ProjectTech(String stack, Project project) {
        this.stack = stack;
        this.project = project;
    }

    public ProjectTech(String stack) {
        this.stack = stack;
    }

    @Override
    public String toString() {
        return "ProjectTech{" +
                "id=" + id +
                ", stack='" + stack + '\'' +
                ", project.id=" + project.getId() +
                '}';
    }
}
