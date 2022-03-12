package kookmin.capstone.backend.domain.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Builder
@AllArgsConstructor
@NoArgsConstructor
public class PositionCnt {

    @Id @GeneratedValue
    @Column(name = "position_cnt_id")
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_position_id")
    private ProjectPosition projectPosition;
    
    @Column(name = "position_name")
    private String name;
}
