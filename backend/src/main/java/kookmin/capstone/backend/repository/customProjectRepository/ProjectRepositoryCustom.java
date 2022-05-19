package kookmin.capstone.backend.repository.customProjectRepository;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;

import java.util.List;

public interface ProjectRepositoryCustom {

    List<Project> search(ProjectSearchCond condition);

    List<ProjectDTO> getTopByScore(Long userId);

    List<ProjectDTO> getTopByCreated(Long userId);
}
