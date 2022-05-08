package kookmin.capstone.backend.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.dto.ProjectSearchCond;
import kookmin.capstone.backend.dto.QProjectDTO;
import lombok.AllArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static kookmin.capstone.backend.domain.project.QProject.project;
import static kookmin.capstone.backend.domain.user.QUser.user;
import static org.thymeleaf.util.StringUtils.isEmpty;

public class ProjectRepositoryImpl implements ProjectRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ProjectRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ProjectDTO> search(ProjectSearchCond condition) {
        return queryFactory
                .select(new QProjectDTO(
                        project.id,
                        project.status,
                        project.title,
                        project.purpose,
                        project.region,
                        project.description,
                        project.field,
                        project.startDate,
                        project.endDate,
                        project.thumbnail,
                        user.id
                ))
                .from(project)
                .where(titleContain(condition.getTitle()),
                        fieldEq(condition.getField())
                       )
                .fetch();
    }

    private BooleanExpression titleContain(String title) {
        return isEmpty(title) ? null : project.title.contains(title);
    }

    private BooleanExpression fieldEq(List<String> field) {
        return field == null ? null : project.field.in(field);
    }

//    private BooleanExpression techContain(List<String> techStack) {
//        if (techStack.size() == 0) {
//            return null;
//        }
//        return techStack.size() == 0 ? null : project.techStack.in(techStack);
//    }

}
