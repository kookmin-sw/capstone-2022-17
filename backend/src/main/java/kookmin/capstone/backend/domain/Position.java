package kookmin.capstone.backend.domain;

import kookmin.capstone.backend.domain.project.ProjectPosition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class Position {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, mappedBy="position")
    private ProjectPosition projectPosition;

    private String positionName;

    public void registProjectPosition(ProjectPosition projectPosition) {
        this.projectPosition = projectPosition;
    }

}
