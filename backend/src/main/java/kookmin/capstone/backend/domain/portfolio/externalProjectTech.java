package kookmin.capstone.backend.domain.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class externalProjectTech {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "external_tech_id")
    private Long id;

    private String stack;
}
