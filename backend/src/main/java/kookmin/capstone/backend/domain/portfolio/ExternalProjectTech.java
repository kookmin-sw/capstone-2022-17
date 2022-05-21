package kookmin.capstone.backend.domain.portfolio;

import kookmin.capstone.backend.dto.portfolioDTO.ExternalTechDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class ExternalProjectTech {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "external_tech_id")
    private Long id;

    private String stack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "external_id")
    private ExternalProject externalProject;

    public void setExternalProject(ExternalProject externalProject) {
        this.externalProject = externalProject;
    }

    public static ExternalProjectTech dtoToEntity(ExternalTechDTO externalTechDTO) {
        return ExternalProjectTech.builder().
                stack(externalTechDTO.getStack()).
                build();
    }
}
