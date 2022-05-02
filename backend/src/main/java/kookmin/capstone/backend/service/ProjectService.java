package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional
    public Long registProject(ProjectDTO dto) {
        Project project = dtoToToEntity(dto);
        projectRepository.save(project);
        return project.getId();
    }

    public Project dtoToToEntity(ProjectDTO dto) {
        Project project = Project.builder().
                title(dto.getTitle()).
                purpose(dto.getPurpose()).
                region(dto.getRegion()).
                startDate(dto.getStartDate()).
                endDate(dto.getEndDate()).
                techStack(dto.getTechStack()).
                build();
        return project;
    }
}
