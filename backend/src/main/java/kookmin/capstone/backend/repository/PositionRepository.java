package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PositionRepository extends JpaRepository<Position, Long> {

    Optional<Position> findByPositionName(String position);
}
