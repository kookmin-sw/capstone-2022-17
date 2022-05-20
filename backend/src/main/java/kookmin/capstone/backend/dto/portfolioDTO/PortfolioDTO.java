package kookmin.capstone.backend.dto.portfolioDTO;



import kookmin.capstone.backend.domain.portfolio.Portfolio;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data @Builder
public class PortfolioDTO {

    private Long id;
    private Set<CareerDTO> careerDTOSet;
    private Set<ExternalProjectDTO> externalProjectDTOSet;
    private Set<EducationDTO> educationDTOSet;

    public static PortfolioDTO entityToDto(Portfolio portfolio) {
        return PortfolioDTO.builder().
                careerDTOSet(portfolio.getCareerSet().stream().map(e -> CareerDTO.entityToDto(e)).collect(Collectors.toCollection(HashSet::new))).
                externalProjectDTOSet(portfolio.getExternalProjectSet().stream().map(e -> ExternalProjectDTO.entityToDto(e)).collect(Collectors.toCollection(HashSet::new))).
                educationDTOSet(portfolio.getEducationSet().stream().map(e -> EducationDTO.entityToDto(e)).collect(Collectors.toCollection(HashSet::new))).
                build();
    }
}
