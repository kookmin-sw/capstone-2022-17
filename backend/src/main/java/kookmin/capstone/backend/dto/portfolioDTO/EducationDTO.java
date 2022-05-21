package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.Education;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class EducationDTO {

    private boolean isGraduate;
    private String schoolName;
    private String major;
    private int grade;

    public static EducationDTO entityToDto(Education education) {
        return EducationDTO.builder().
                isGraduate(education.isGraduate()).
                schoolName(education.getSchoolName()).
                major(education.getMajor()).
                grade(education.getGrade()).
                build();
    }
}
