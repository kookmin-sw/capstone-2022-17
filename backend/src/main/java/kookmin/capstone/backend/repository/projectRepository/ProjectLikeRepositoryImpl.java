package kookmin.capstone.backend.repository.projectRepository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.domain.project.QProjectLike;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectLikeCustomRepository;

import javax.persistence.EntityManager;

import static kookmin.capstone.backend.domain.project.QProjectLike.projectLike;

public class ProjectLikeRepositoryImpl implements ProjectLikeCustomRepository {

    private final JPAQueryFactory queryFactory;

    public ProjectLikeRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    
    @Override
    public boolean existsUserLike(Long projectId, Long userId) {
        Integer fetchOne = queryFactory
                .selectOne()
                .from(projectLike)
                .where(projectLike.user.id.eq(userId),
                        projectLike.project.id.eq(projectId))
                .fetchFirst();
        return fetchOne != null;
    }
}
