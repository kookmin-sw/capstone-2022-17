package kookmin.capstone.backend.domain;

import lombok.Getter;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Project {

    @Id @GeneratedValue
    @Column(name = "project_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String thumbnail;
    private Integer totalMember;
}
