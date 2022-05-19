package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.UserPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPositionRepository extends JpaRepository<UserPosition, Long> {

    @Query("select up from UserPosition up where up.user.id=:userId")
    List<UserPosition> findAllByUserId(@Param("userId") Long userId);

    void deleteById(Long id);
}
