package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TechStackRepository extends JpaRepository<TechStack, Long> {

    boolean existsByStack(String stack);
}
