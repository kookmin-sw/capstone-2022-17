package kookmin.capstone.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private Long id;
    private ProjectStatus status;

    private String title;
    private String purpose;
    private String region;
    private String description;
    private String field;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String thumbnail;
    private String techStack;

    private Long userId;
}
