package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.dto.ProjectSearchCond;

import java.util.List;

public interface ProjectRepositoryCustom {

    List<ProjectDTO> search(ProjectSearchCond condition);
}
