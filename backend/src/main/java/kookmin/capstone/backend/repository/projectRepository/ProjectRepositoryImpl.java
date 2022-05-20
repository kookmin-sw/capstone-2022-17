package kookmin.capstone.backend.repository.projectRepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.domain.QProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.QProject;
import kookmin.capstone.backend.domain.project.QProjectLike;
import kookmin.capstone.backend.domain.project.QProjectPosition;
import kookmin.capstone.backend.domain.user.QUser;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static kookmin.capstone.backend.domain.QProjectTech.projectTech;
import static kookmin.capstone.backend.domain.project.QProject.project;
import static kookmin.capstone.backend.domain.project.QProjectLike.projectLike;
import static kookmin.capstone.backend.domain.project.QProjectPosition.projectPosition;
import static kookmin.capstone.backend.domain.user.QUser.user;
import static org.thymeleaf.util.StringUtils.isEmpty;

public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ProjectRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<ProjectDTO> search(ProjectSearchCond condition, Pageable pageable, Long userId) {
        QProjectTech techStack = projectTech;
        QProject project = QProject.project;
        QUser user = QUser.user;
        List<Project> content = queryFactory
                .select(project)
                .from(project)
                .rightJoin(project.techStack, techStack)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .distinct()
                .where(titleContain(condition.getTitle()),
                        fieldEq(condition.getField()),
                        techContain(condition.getTechStacks()),
                        regionEq(condition.getRegion()),
                        purposeEq(condition.getPurpose()),
                        positionContain(condition.getPositions())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(project.count())
                .from(project)
                .where(titleContain(condition.getTitle()),
                        fieldEq(condition.getField()),
                        techContain(condition.getTechStacks()),
                        regionEq(condition.getRegion()),
                        purposeEq(condition.getPurpose()),
                        positionContain(condition.getPositions())
                )
                .fetchOne();
        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));
        return new PageImpl(projectDTOList, pageable, count);
    }

    private BooleanExpression titleContain(String title) {
        return isEmpty(title) ? null : project.title.contains(title);
    }

    private BooleanExpression fieldEq(List<String> field) {
        return field.size() == 0 ? null : project.field.in(field);
    }

    private BooleanExpression regionEq(String region) {
        return isEmpty(region) ? null : project.region.eq(region);
    }

    private BooleanExpression purposeEq(List<String> purpose) {
        return purpose.size() == 0 ? null : project.field.in(purpose);
    }

    private BooleanExpression positionContain(List<String> positions) {
        return positions.size() == 0 ? null :
                project.positions.any().position.positionName.in(positions);
    }

    private BooleanExpression techContain(List<String> techStacks) {
        return techStacks.size() == 0 ? null :
                project.techStack.any().stack.in(techStacks);
    }

    @Override
    public List<ProjectDTO> getTopByScore(Long userId) {
        List<Project> content = queryFactory
                .select(project).from(project)
                .rightJoin(project.techStack, projectTech)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .leftJoin(project.projectLikes, projectLike)
                .fetchJoin()
                .distinct()
                .orderBy(project.score.desc())
                .offset(0)
                .limit(4)
                .fetch();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));
        return projectDTOList;
    }

    @Override
    public List<ProjectDTO> getTopByCreated(Long userId) {
        List<Project> content = queryFactory
                .select(project).from(project)
                .rightJoin(project.techStack, projectTech)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .leftJoin(project.projectLikes, projectLike)
                .fetchJoin()
                .distinct()
                .orderBy(project.createdAt.desc())
                .offset(0)
                .limit(4)
                .fetch();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));
        return projectDTOList;
    }

}
