package kookmin.capstone.backend.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.domain.QProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.QProject;
import kookmin.capstone.backend.domain.user.QUser;
import kookmin.capstone.backend.dto.ProjectSearchCond;


import javax.persistence.EntityManager;
import java.util.List;

import static kookmin.capstone.backend.domain.QProjectTech.projectTech;
import static kookmin.capstone.backend.domain.project.QProject.project;
import static org.thymeleaf.util.StringUtils.isEmpty;

public class ProjectRepositoryImpl implements ProjectRepositoryCustom{

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

    private BooleanExpression fieldEq(List<String> field) {
        return field.size() == 0 ? null : project.field.in(field);
    }

    private BooleanExpression techContain(List<String> techStacks) {
        return techStacks.size() == 0 ? null :
                project.techStack.any().stack.in(techStacks);
    }

}
