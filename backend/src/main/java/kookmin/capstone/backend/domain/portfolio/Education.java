package kookmin.capstone.backend.domain.portfolio;

import kookmin.capstone.backend.domain.DateEntity;
import kookmin.capstone.backend.dto.portfolioDTO.EducationDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class Education {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "education_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @Column(columnDefinition="tinyint(1)")
    private boolean isGraduate;

    @Column(name = "school_name")
    private String schoolName;

    private String major;

    private int grade;

    protected void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public static Education dtoToEntity(EducationDTO educationDTO) {
        return Education.builder().
                grade(educationDTO.getGrade()).
                schoolName(educationDTO.getSchoolName()).
                major(educationDTO.getMajor()).
                isGraduate(educationDTO.isGraduate()).
                build();
    }
}
