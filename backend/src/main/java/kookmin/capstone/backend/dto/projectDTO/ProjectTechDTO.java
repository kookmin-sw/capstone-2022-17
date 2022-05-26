package kookmin.capstone.backend.dto.projectDTO;

import kookmin.capstone.backend.domain.ProjectTech;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Objects;

@Data
public class ProjectTechDTO {

    private String stack;
    private Long id;

    public ProjectTechDTO(String stack) {
        this.stack = stack;
    }

    public ProjectTechDTO(String stack, Long id) {
        this.stack = stack;
        this.id = id;
    }

    public static ProjectTechDTO entityToDto(ProjectTech projectTech) {
        ProjectTechDTO projectTechDTO = new ProjectTechDTO(projectTech.getStack(), projectTech.getId());
        return projectTechDTO;
    }

    @Override
    public boolean equals(Object o) {

        ProjectTechDTO projectTech = (ProjectTechDTO) o;
        if (projectTech.getStack().equals(this.stack)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStack());
    }
}
