package kookmin.capstone.backend.dto.projectDTO;

import kookmin.capstone.backend.domain.project.ProjectPosition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPositionDTO {

    private int total;
    private int currentCnt;
    private String positionName;

    public static ProjectPositionDTO entityToDto(ProjectPosition projectPosition) {
        ProjectPositionDTO projectPositionDTO = ProjectPositionDTO.builder().
                positionName(projectPosition.getPosition().getPositionName()).
                currentCnt(projectPosition.getCurrentCnt()).
                total(projectPosition.getTotal()).
                build();
        return projectPositionDTO;
    }
}
