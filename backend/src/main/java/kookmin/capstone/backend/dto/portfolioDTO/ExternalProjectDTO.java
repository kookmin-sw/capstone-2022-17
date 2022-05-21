package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.ExternalProject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExternalProjectDTO {

    private String projectName;
    private String githubLink;
    private String description;
    private Set<ExternalTechDTO> externalTechDTOSet;

    public static ExternalProjectDTO entityToDto(ExternalProject externalProject) {
        return ExternalProjectDTO.builder().
                projectName(externalProject.getProjectName()).
                githubLink(externalProject.getGithubLink()).
                description(externalProject.getDescription()).
                externalTechDTOSet(externalProject.getExternalProjectTechSet().stream().
                        map(e -> ExternalTechDTO.entityToDto(e)).collect(Collectors.toCollection(HashSet::new))).
                build();
    }
}
