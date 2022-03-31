package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<Object> findByName(String username);
}
