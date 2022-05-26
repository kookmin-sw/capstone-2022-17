package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.portfolio.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
}
