package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.project.Project;
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
    public Long registProject(Project project) {
        projectRepository.save(project);
        return project.getId();
    }
}
