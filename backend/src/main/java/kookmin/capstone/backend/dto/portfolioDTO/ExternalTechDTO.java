package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.ExternalProjectTech;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data @Builder
@NoArgsConstructor
public class ExternalTechDTO {

    private String stack;
    private Long id;

    public ExternalTechDTO(String stack) {
        this.stack = stack;
    }

    public ExternalTechDTO(String stack, Long id) {
        this.stack = stack;
        this.id = id;
    }

    public static ExternalTechDTO entityToDto(ExternalProjectTech externalProjectTech) {
        ExternalTechDTO projectTechDTO = new ExternalTechDTO(externalProjectTech.getStack(), externalProjectTech.getId());
        return projectTechDTO;
    }

}
