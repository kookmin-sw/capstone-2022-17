package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class ProjectPosition {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_position_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "projectPosition")
    private Position position;

    private int total;

    private int currentCnt;

    public void registProject(Project project) {
        this.project = project;
    }

    public void addCnt() {
        this.currentCnt++;
    }
}
