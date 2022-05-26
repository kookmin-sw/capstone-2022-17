package kookmin.capstone.backend.repository.projectRepository;


import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, ProjectRepositoryCustom {

    Project findByTitle(String title);

    Optional<Project> findById(Long id);

    void deleteById(Long id);

    @Query("select p from Project p where p.id in :ids")
    List<Project> findRecommend(@Param("ids") List<Long> ids);

}
