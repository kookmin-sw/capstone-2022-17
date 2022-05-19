package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.UserTech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserTechRepository extends JpaRepository<UserTech, Long> {

    @Query("select ut from UserTech ut where ut.user.id=:userId")
    List<UserTech> findAllByUserId(@Param("userId") Long userId);

    void deleteById(Long id);
}
