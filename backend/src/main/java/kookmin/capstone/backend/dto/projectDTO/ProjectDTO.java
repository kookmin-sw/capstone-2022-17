package kookmin.capstone.backend.dto.projectDTO;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data @Builder
@NoArgsConstructor @AllArgsConstructor
@ToString
public class ProjectDTO {
    private Long id;
    private ProjectStatus status;

    private String title;
    private String purpose;
    private String region;
    private String description;
    private String field;
    private String thumbnail;
    private List<ProjectTechDTO> techStack;
    private List<ProjectPositionDTO> projectPositions;
    private Long userId;
    private Long score;
    private int likes;
    private int views;
    private boolean isLike;

    public static ProjectDTO entityToDto(Project project, Long userId) {
        List<ProjectTechDTO> projectTechList = project.getTechStack().stream().map(e ->
                ProjectTechDTO.entityToDto(e)).collect(Collectors.toCollection(ArrayList::new));

        List<Long> userList = project.getProjectLikes().stream().map(e -> e.getUser().getId()).
                collect(Collectors.toCollection(ArrayList::new));

        List<ProjectPositionDTO> projectPositionList = project.getPositions().stream().map(e ->
                ProjectPositionDTO.entityToDto(e)).collect(Collectors.toCollection(ArrayList::new));

        return ProjectDTO.builder().
                id(project.getId()).
                status(project.getStatus()).
                title(project.getTitle()).
                purpose(project.getPurpose()).
                region(project.getRegion()).
                description(project.getDescription()).
                field(project.getField()).
                thumbnail(project.getThumbnail()).
                techStack(projectTechList).
                projectPositions(projectPositionList).
                userId(project.getUser().getId()).
                score(project.getScore()).
                likes(project.getLikes()).
                views(project.getViews()).
                isLike(userList.contains(userId)).
                build();
    }

}
