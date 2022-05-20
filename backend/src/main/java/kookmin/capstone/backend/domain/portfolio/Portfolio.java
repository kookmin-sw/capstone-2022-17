package kookmin.capstone.backend.domain.portfolio;

import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
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
}
