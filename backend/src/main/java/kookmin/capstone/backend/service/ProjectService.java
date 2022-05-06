package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.repository.ProjectRepository;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public void registProject(ProjectDTO dto) {
        Project project = dtoToToEntity(dto);
        projectRepository.save(project);
    }

    @Transactional
    public void modifyProject(ProjectDTO dto) {
        Optional<Project> findProject = projectRepository.findById(dto.getId());
        Project project = findProject.get();

        project.chageProject(dto.getDescription(), dto.getThumbnail(), dto.getStatus(),
                dto.getTitle(), dto.getPurpose(), dto.getField(), dto.getRegion(), dto.getTechStack());
        project.changeStartDate(dto.getStartDate());
        project.changeEndDate(dto.getEndDate());

        projectRepository.save(project);

    }

    @Transactional
    public void removeProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project dtoToToEntity(ProjectDTO dto) {
        Optional<User> user = userRepository.findById(dto.getUserId());
        Project project = Project.builder().
                title(dto.getTitle()).
                purpose(dto.getPurpose()).
                region(dto.getRegion()).
                startDate(dto.getStartDate()).
                endDate(dto.getEndDate()).
                techStack(dto.getTechStack()).
                description(dto.getDescription()).
                status(dto.getStatus()).
                field(dto.getField()).
                user(user.get()).
                thumbnail(dto.getThumbnail()).
                build();
        return project;
    }
}
