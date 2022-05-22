package kookmin.capstone.backend.repository.customProjectRepository;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectRepositoryCustom {

    Page<ProjectDTO> search(ProjectSearchCond condition, Pageable pageable, Long userId);

    List<ProjectDTO> getTopByScore(Long userId);

    List<ProjectDTO> getTopByCreated(Long userId);

    Page<ProjectDTO> progress(Pageable pageable, Long userId);

    Page<ProjectDTO> likes(Pageable pageable, Long userId);

    Page<ProjectDTO> done(Pageable pageable, Long userId);

    List<UserResDTO> getCandidateUser(Long projectId, Long userId);
}
