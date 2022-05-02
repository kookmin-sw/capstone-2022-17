package kookmin.capstone.backend.dto;

import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private ProjectStatus status;

    private String title;
    private String purpose;
    private String region;
    private String filed;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private List<TechStack> techStack;
}
