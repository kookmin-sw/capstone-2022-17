package kookmin.capstone.backend.domain.project;

import kookmin.capstone.backend.domain.DateEntity;
import kookmin.capstone.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project extends DateEntity {

    @Id @GeneratedValue
    @Column(name = "project_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private String thumbnail;

    @Column(name = "project_status", columnDefinition = "tinyint(1)")
    private boolean status;

    @Column(name = "project_title")
    private String title;
    private String purpose;
    private String field;
}
