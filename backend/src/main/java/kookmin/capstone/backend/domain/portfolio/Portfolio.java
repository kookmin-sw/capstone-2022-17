package kookmin.capstone.backend.domain.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Portfolio {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "portfolio_id")
    private Long id;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private Set<Career> careerSet = new HashSet<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private Set<ExternalProject> externalProjectSet = new HashSet<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private Set<Education> educationSet = new HashSet<>();

    //연관 관계 편의 메소드
    public void addCareer(Career career) {
        this.careerSet.add(career);
        career.setPortfolio(this);
    }

    public void addExternalProject(ExternalProject externalProject) {
        this.externalProjectSet.add(externalProject);
        externalProject.setPortfolio(this);
    }

    public void addEducation(Education education) {
        this.educationSet.add(education);
        education.setPortfolio(this);
    }

    //생성 메소드
//    public static Portfolio createPortfolio(Set<Career> careerSet, Set<ExternalProject> externalProjectSet,
//                                            Set<Education> educationSet) {
//
//    }
}
