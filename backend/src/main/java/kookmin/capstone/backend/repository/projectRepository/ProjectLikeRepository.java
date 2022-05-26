package kookmin.capstone.backend.repository.projectRepository;

import kookmin.capstone.backend.domain.project.ProjectLike;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectLikeCustomRepository;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectLikeRepository extends JpaRepository<ProjectLike, Long>, ProjectLikeCustomRepository {

    @Query("delete from ProjectLike l where l.project.id=:projectId and l.user.id=:userId")
    @Modifying
    void deleteLike(@Param("projectId") Long projectId, @Param("userId") Long userId);
}
