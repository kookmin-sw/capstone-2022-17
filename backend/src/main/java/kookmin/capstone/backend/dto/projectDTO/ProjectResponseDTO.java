package kookmin.capstone.backend.dto.projectDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import kookmin.capstone.backend.domain.user.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data @Builder
public class ProjectResponseDTO {

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
    private List<ProjectTech> techStack;
    private List<ProjectPosition> projectPositions;
    private User user;

    public static ProjectResponseDTO entityToDto(Project project) {
        return ProjectResponseDTO.builder().
                id(project.getId()).
                status(project.getStatus()).
                title(project.getTitle()).
                purpose(project.getPurpose()).
                region(project.getRegion()).
                startDate(project.getStartDate()).
                endDate(project.getEndDate()).
                thumbnail(project.getThumbnail()).
                techStack(project.getTechStack()).
                projectPositions(project.getPositions()).
                user(project.getUser()).
                build();
    }
}
