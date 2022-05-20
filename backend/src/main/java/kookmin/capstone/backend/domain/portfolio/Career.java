package kookmin.capstone.backend.domain.portfolio;

import kookmin.capstone.backend.domain.DateEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter @SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Career extends DateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "career_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @Column(columnDefinition="tinyint(1)")
    private boolean isWorking;

    @Column(name = "company_name")
    private String companyName;
    
    @Column(name = "career_position")
    private String position;
}
