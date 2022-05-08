package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.repository.ProjectRepository;
import kookmin.capstone.backend.repository.ProjectTechRepository;
import kookmin.capstone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectTechRepository projectTechRepository;

    @Transactional
    public void registProject(ProjectDTO dto) {
        Project project = dtoToToEntity(dto);
        projectRepository.save(project);
    }

    @Transactional
    public void modifyProject(ProjectDTO dto) {
        Optional<Project> findProject = projectRepository.findById(dto.getId());
        Project project = findProject.get();
        List<String> techStack = new ArrayList<>();
        List<ProjectTech> result = projectTechRepository.findByProject(project);
        result.stream().forEach(stack -> techStack.add(stack.getStack()));

        for (ProjectTech projectTech : result) {
            if (!dto.getTechStack().contains(projectTech.getStack())) {
                projectTechRepository.deleteById(projectTech.getId());
            } else {
                dto.getTechStack().remove(projectTech.getStack());
            }
        }

        dto.getTechStack().stream().forEach(stack -> project.addTechStack(new ProjectTech(stack)));


        project.chageProject(dto.getDescription(), dto.getThumbnail(), dto.getStatus(),
                dto.getTitle(), dto.getPurpose(), dto.getField(), dto.getRegion());
        project.changeStartDate(dto.getStartDate());
        project.changeEndDate(dto.getEndDate());

        projectRepository.save(project);

    }

    @Transactional
    public void addProjectStack(List<String> techStack) {}

    @Transactional
    public void removeProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project dtoToToEntity(ProjectDTO dto) {
        Optional<User> user = userRepository.findById(dto.getUserId());

        List<ProjectTech> techStack = new ArrayList<>();

        Project project = Project.builder().
                title(dto.getTitle()).
                purpose(dto.getPurpose()).
                region(dto.getRegion()).
                startDate(dto.getStartDate()).
                endDate(dto.getEndDate()).
                description(dto.getDescription()).
                status(dto.getStatus()).
                field(dto.getField()).
                user(user.get()).
                thumbnail(dto.getThumbnail()).
                build();
        dto.getTechStack().stream().forEach(tech -> techStack.add(new ProjectTech(tech, project)));
        project.initTechStack(techStack);
        return project;
    }
}
