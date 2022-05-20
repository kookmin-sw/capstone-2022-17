package kookmin.capstone.backend.domain.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExternalProjects {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "external_id")
    private Long id;

    private String projectName;
    private String githubLink;
    private String description;
    private String releaseLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;
}
