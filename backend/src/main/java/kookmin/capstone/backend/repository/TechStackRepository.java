package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.TechStack;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TechStackRepository extends JpaRepository<TechStack, Long> {

    @Query("select tech from TechStack tech where tech.stack like concat(:name,'%')")
    List<TechStack> findByNameStart(@Param("name") String name, Pageable pageable);

    @Query("select tech from TechStack tech where tech.stack like concat('% ', :name,'%')")
    List<TechStack> findByNameContain(@Param("name") String name, Pageable pageable);
}
