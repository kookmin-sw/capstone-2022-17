package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.ExternalProjects;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class ExternalProjectDTO {

    private String projectName;
    private String githubLink;
    private String description;

    public static ExternalProjectDTO entityToDto(ExternalProjects externalProjects) {
        return ExternalProjectDTO.builder().
                projectName(externalProjects.getProjectName()).
                githubLink(externalProjects.getGithubLink()).
                description(externalProjects.getDescription()).
                build();
    }
}
