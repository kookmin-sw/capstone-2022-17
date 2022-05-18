package kookmin.capstone.backend.repository.projectRepository;

import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectTechRepository extends JpaRepository<ProjectTech, Long> {

    List<ProjectTech> findByProject(Project project);

    void deleteById(Long id);
}
