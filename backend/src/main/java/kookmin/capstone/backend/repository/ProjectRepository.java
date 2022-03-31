package kookmin.capstone.backend.repository;


import kookmin.capstone.backend.domain.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByTitle(String title);
}
