package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.User;
import kookmin.capstone.backend.domain.project.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

public interface UserRepository extends JpaRepository<User, Long> {
}
