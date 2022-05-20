package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.Education;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class EducationDTO {

    private boolean isGraduate;
    private String schoolName;
    private String major;

    public static EducationDTO entityToDto(Education education) {
        return EducationDTO.builder().
                isGraduate(education.isGraduate()).
                schoolName(education.getSchoolName()).
                major(education.getMajor()).
                build();
    }
}
