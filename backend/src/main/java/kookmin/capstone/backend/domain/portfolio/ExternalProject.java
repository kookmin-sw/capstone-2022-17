package kookmin.capstone.backend.domain.portfolio;

import kookmin.capstone.backend.dto.portfolioDTO.EducationDTO;
import kookmin.capstone.backend.dto.portfolioDTO.ExternalProjectDTO;
import kookmin.capstone.backend.dto.portfolioDTO.ExternalTechDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExternalProject {

    public ExternalProject(String projectName, String githubLink, String description) {
        this.projectName = projectName;
        this.githubLink = githubLink;
        this.description = description;

    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "external_id")
    private Long id;

    private String projectName;
    private String githubLink;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "externalProject")
    private Set<ExternalProjectTech> externalProjectTechSet = new HashSet<>();

    protected void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public static ExternalProject dtoToEntity(ExternalProjectDTO externalProjectDTO) {
//        ExternalProject externalProject = ExternalProject.builder().
//                projectName(externalProjectDTO.getProjectName()).
//                githubLink(externalProjectDTO.getGithubLink()).
//                description(externalProjectDTO.getDescription()).
//                build();
        ExternalProject externalProject = new ExternalProject(externalProjectDTO.getProjectName(), externalProjectDTO.getGithubLink(), externalProjectDTO.getDescription());
        Set<ExternalProjectTech> collect = externalProjectDTO.getExternalTechDTOSet().stream().
                map(e -> ExternalProjectTech.dtoToEntity(e)).collect(Collectors.toCollection(HashSet::new));
        for (ExternalProjectTech externalProjectTech : collect) {
            externalProject.addTechStack(externalProjectTech);
        }
        return externalProject;
    }

    public void addTechStack(ExternalProjectTech externalProjectTech) {
        this.externalProjectTechSet.add(externalProjectTech);
        externalProjectTech.setExternalProject(this);
    }

}
