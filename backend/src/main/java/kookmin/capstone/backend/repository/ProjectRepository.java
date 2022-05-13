package kookmin.capstone.backend.repository;


import kookmin.capstone.backend.domain.project.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, ProjectRepositoryCustom{

    Project findByTitle(String title);

    boolean existsByTitle(String title);

    Optional<Project> findById(Long id);

//    Page<Project> findByTitleContaining(String searchTitle, Pageable pageable);
}
