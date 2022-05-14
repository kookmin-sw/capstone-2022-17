package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.Position;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, Long> {

    ProjectPosition findByPosition(Position position);
}
