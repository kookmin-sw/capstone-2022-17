package kookmin.capstone.backend.dto.projectDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectRequestDTO {
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
    private boolean isLike;
    private String leaderPosition;

//  @QueryProjection
    public ProjectRequestDTO(Long id, ProjectStatus status, String title, String purpose,
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



    public static ProjectRequestDTO entityToDto(Project project) {
        List<String> techStack = project.getTechStack().stream().map(e -> e.getStack()).collect(Collectors.toCollection(ArrayList::new));
        List<ProjectPositionDTO> projectPositionDTO = new ArrayList<>();
        project.getPositions().stream().forEach(e -> projectPositionDTO.add(ProjectPositionDTO.entityToDto(e)));

        ProjectRequestDTO projectRequestDTO = ProjectRequestDTO.builder().
                id(project.getId()).
                status(project.getStatus()).
                title(project.getTitle()).
                purpose(project.getPurpose()).
                description(project.getDescription()).
                field(project.getField()).
                startDate(project.getStartDate()).
                endDate(project.getEndDate()).
                thumbnail(project.getThumbnail()).
                techStack(techStack).
                region(project.getRegion()).
                projectPositions(projectPositionDTO).
                userId(project.getUser().getId()).
                build();
        return projectRequestDTO;
    }

    public static ProjectRequestDTO entityToDtoAddLike(Project project, boolean isLike) {
        ProjectRequestDTO projectRequestDTO = ProjectRequestDTO.entityToDto(project);
        projectRequestDTO.setLike(isLike);
        return projectRequestDTO;
    }
}
