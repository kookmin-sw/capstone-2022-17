package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.dto.ProjectSearchCond;

import java.util.List;

public interface ProjectRepositoryCustom {

    List<Project> search(ProjectSearchCond condition);
}
