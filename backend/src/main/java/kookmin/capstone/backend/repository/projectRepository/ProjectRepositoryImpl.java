package kookmin.capstone.backend.repository.projectRepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.domain.QProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.QProject;
import kookmin.capstone.backend.domain.project.QProjectPosition;
import kookmin.capstone.backend.domain.user.QUser;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;
import kookmin.capstone.backend.dto.projectDTO.QProjectDTO;
import kookmin.capstone.backend.repository.customProjectRepository.ProjectRepositoryCustom;
import org.springframework.stereotype.Repository;


import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static kookmin.capstone.backend.domain.QProjectTech.projectTech;
import static kookmin.capstone.backend.domain.project.QProject.project;
import static kookmin.capstone.backend.domain.project.QProjectPosition.projectPosition;
import static kookmin.capstone.backend.domain.user.QUser.user;
import static org.thymeleaf.util.StringUtils.isEmpty;

public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ProjectRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Project> search(ProjectSearchCond condition) {
        QProjectTech techStack = projectTech;
        QProject project = QProject.project;
        QUser user = QUser.user;
        return queryFactory
                .select(project)
                .from(project)
                .rightJoin(project.techStack, techStack)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .distinct()
                .where(titleContain(condition.getTitle()),
                        fieldEq(condition.getField()),
                        techContain(condition.getTechStacks())
                       )
                .fetch();
    }



    private BooleanExpression titleContain(String title) {
        return isEmpty(title) ? null : project.title.contains(title);
    }

    @Override
    public List<ProjectDTO> getTopByScore() {
        List<Project> content = queryFactory
                .select(project).from(project)
                .rightJoin(project.techStack, projectTech)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .distinct()
                .orderBy(project.score.desc())
                .offset(0)
                .limit(4)
                .fetch();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e)).
                collect(Collectors.toCollection(ArrayList::new));
        return projectDTOList;
    }

    @Override
    public List<ProjectDTO> getTopByCreated() {
        List<Project> content = queryFactory
                .select(project).from(project)
                .rightJoin(project.techStack, projectTech)
                .fetchJoin()
                .leftJoin(project.user, user)
                .fetchJoin()
                .distinct()
                .orderBy(project.createdAt.desc())
                .offset(0)
                .limit(4)
                .fetch();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e)).
                collect(Collectors.toCollection(ArrayList::new));
        return projectDTOList;
    }

    private BooleanExpression fieldEq(List<String> field) {
        return field.size() == 0 ? null : project.field.in(field);
    }

    private BooleanExpression techContain(List<String> techStacks) {
        return techStacks.size() == 0 ? null :
                project.techStack.any().stack.in(techStacks);
    }

}
