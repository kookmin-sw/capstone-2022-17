package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.ExternalProject;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class ExternalProjectDTO {

    private String projectName;
    private String githubLink;
    private String description;

    public static ExternalProjectDTO entityToDto(ExternalProject externalProject) {
        return ExternalProjectDTO.builder().
                projectName(externalProject.getProjectName()).
                githubLink(externalProject.getGithubLink()).
                description(externalProject.getDescription()).
                build();
    }
}
