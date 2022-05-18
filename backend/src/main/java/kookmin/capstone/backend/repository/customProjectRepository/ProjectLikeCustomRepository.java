package kookmin.capstone.backend.repository.customProjectRepository;

public interface ProjectLikeCustomRepository {
    boolean existsUserLike(Long projectId, Long userId);
}
