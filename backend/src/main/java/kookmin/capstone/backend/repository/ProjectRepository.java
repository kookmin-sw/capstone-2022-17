package kookmin.capstone.backend.repository;


import kookmin.capstone.backend.domain.project.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long>, ProjectRepositoryCustom{

    Project findByTitle(String title);

    Page<Project> findByTitleContaining(String searchTitle, Pageable pageable);
}
