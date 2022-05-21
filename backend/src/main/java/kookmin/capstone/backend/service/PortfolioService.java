package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.portfolio.*;
import kookmin.capstone.backend.dto.portfolioDTO.*;
import kookmin.capstone.backend.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    @Transactional
    public PortfolioDTO save(PortfolioDTO portfolioDTO) {
        Portfolio savedPortfolio = portfolioRepository.save(dtoToEntity(portfolioDTO));
        return PortfolioDTO.entityToDto(savedPortfolio);
    }

    public Portfolio dtoToEntity(PortfolioDTO portfolioDTO) {

//        Set<CareerDTO> careerDTOSet = new HashSet<>();
//        Set<ExternalProjectDTO> externalProjectDTOSet = new HashSet<>();
//        Set<EducationDTO> educationDTOSet = new HashSet<>();


        Portfolio portfolio = new Portfolio();

        for (CareerDTO careerDTO : portfolioDTO.getCareerDTOSet()) {
            portfolio.addCareer(Career.dtoToEntity(careerDTO));
        }

        for (EducationDTO educationDTO : portfolioDTO.getEducationDTOSet()) {
            portfolio.addEducation(Education.dtoToEntity(educationDTO));
        }

        for (ExternalProjectDTO externalProjectDTO : portfolioDTO.getExternalProjectDTOSet()) {
            ExternalProject externalProject = ExternalProject.dtoToEntity(externalProjectDTO);
            portfolio.addExternalProject(externalProject);
        }


        return portfolio;
    }

}
