package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.DateEntity;
import kookmin.capstone.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project extends DateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private String thumbnail;

    //TODO: Enum 타입으로 변경 해야 함
    @Enumerated(EnumType.STRING)
    @Column(name = "project_status")
    private ProjectStatus status;

    @Column(name = "project_title")
    private String title;
    private String purpose;
    private String field;
}
