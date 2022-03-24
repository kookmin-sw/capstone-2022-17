package kookmin.capstone.backend.repository;


import kookmin.capstone.backend.domain.project.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProjectRepository {
    
    private final EntityManager em;
    
    public void save(Project project) {
        em.persist(project);
    }

    public Project findOne(Long id) {
        return em.find(Project.class, id);
    }

    public List<Project> findAll() {
        return em.createQuery("select p from Project p", Project.class)
                .getResultList();
    }

    public List<Project> findByTitle(String title) {
        return em.createQuery("select p from Project p where p.title = :title", Project.class)
                .setParameter("title", title)
                .getResultList();
    }
}
