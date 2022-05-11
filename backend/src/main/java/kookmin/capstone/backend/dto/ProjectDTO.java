package kookmin.capstone.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.annotations.QueryProjection;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import kookmin.capstone.backend.domain.user.User;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
@Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectDTO {
    private Long id;
    private ProjectStatus status;

    private String title;
    private String purpose;
    private String region;
    private String description;
    private String field;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String thumbnail;
    private List<String> techStack;
    private List<ProjectPositionDTO> projectPositions;
    private Long userId;

//    @QueryProjection
    public ProjectDTO(Long id, ProjectStatus status, String title, String purpose,
                      String region, String description, String field,
                      LocalDate startDate, LocalDate endDate, String thumbnail, Long userId,
                      List<String> techStack, List<ProjectPositionDTO> projectPositions) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.purpose = purpose;
        this.region = region;
        this.description = description;
        this.field = field;
        this.startDate = startDate;
        this.endDate = endDate;
        this.thumbnail = thumbnail;
        this.userId = userId;
        this.techStack = techStack;
        this.projectPositions = projectPositions;
    }



    public static ProjectDTO entityToDto(Project project) {
        ProjectDTO projectDTO = ProjectDTO.builder().
                status(project.getStatus()).
                title(project.getTitle()).
                build();
        return projectDTO;
    }
}
