package kookmin.capstone.backend.repository.projectRepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kookmin.capstone.backend.domain.QProjectTech;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.member.MemberType;
import kookmin.capstone.backend.domain.member.QMember;
import kookmin.capstone.backend.domain.project.*;
import kookmin.capstone.backend.domain.user.QUser;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;
import kookmin.capstone.backend.dto.userDTO.QUserResDTO;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserResDTO;
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

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static kookmin.capstone.backend.domain.QProjectTech.projectTech;
import static kookmin.capstone.backend.domain.member.QMember.member;
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
    public Page<ProjectDTO> progress(Pageable pageable, Long userId) {

        List<Project> content = queryFactory
                .select(project)
                .from(project)
                .rightJoin(project.members, member)
                .fetchJoin()
                .distinct()
                .where(project.status.eq(ProjectStatus.IN_PROGRESS),
                        member.memberType.eq(MemberType.MEMBER).
                                or(member.memberType.eq(MemberType.LEADER)),
                        member.user.id.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(project.count())
                .from(project)
                .where(project.status.eq(ProjectStatus.IN_PROGRESS),
                        project.members.any().memberType.eq(MemberType.MEMBER).
                                or(project.members.any().memberType.eq(MemberType.LEADER)),
                        project.members.any().user.id.eq(userId))
                .fetchOne();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));

        for (int i = 0; i < content.size(); i++) {
            for (Member member : content.get(i).getMembers()) {
                if (member.getUser().getId() == userId) {
                    projectDTOList.get(i).setMyPosition(member.getPosition().getPositionName());
                }
            }
        }

        return new PageImpl(projectDTOList, pageable, count);
    }

    @Override
    public Page<ProjectDTO> likes(Pageable pageable, Long userId) {

        List<Project> content = queryFactory
                .select(project)
                .from(project)
                .rightJoin(project.projectLikes, projectLike)
                .fetchJoin()
                .leftJoin(projectLike.user, user)
                .fetchJoin()
                .distinct()
                .where(project.id.eq(project.projectLikes.any().project.id),
                        project.projectLikes.any().user.id.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(project.count())
                .from(project)
                .where(project.id.eq(project.projectLikes.any().project.id),
                        project.projectLikes.any().user.id.eq(userId))
                .fetchOne();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));

        for (int i = 0; i < content.size(); i++) {
            for (Member member : content.get(i).getMembers()) {
                if (member.getUser().getId() == userId) {
                    projectDTOList.get(i).setMyPosition(member.getPosition().getPositionName());
                }
            }
        }

        return new PageImpl(projectDTOList, pageable, count);
    }

    @Override
    public Page<ProjectDTO> done(Pageable pageable, Long userId) {

        List<Project> content = queryFactory
                .select(project)
                .from(project)
                .rightJoin(project.members, member)
                .fetchJoin()
                .distinct()
                .where(project.status.eq(ProjectStatus.DONE),
                        member.memberType.eq(MemberType.MEMBER).
                                or(member.memberType.eq(MemberType.LEADER)),
                        member.user.id.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(project.count())
                .from(project)
                .where(project.status.eq(ProjectStatus.DONE),
                        project.members.any().memberType.eq(MemberType.MEMBER).
                                or(project.members.any().memberType.eq(MemberType.LEADER)),
                        project.members.any().user.id.eq(userId))
                .fetchOne();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));

        for (int i = 0; i < content.size(); i++) {
            for (Member member : content.get(i).getMembers()) {
                if (member.getUser().getId() == userId) {
                    projectDTOList.get(i).setMyPosition(member.getPosition().getPositionName());
                }
            }
        }

        return new PageImpl(projectDTOList, pageable, count);
    }

    @Override
    public List<UserResDTO> getCandidateUser(Long projectId, Long userId) {
        List<User> userList = queryFactory
                .select(user)
                .from(user)
                .rightJoin(user.members, member)
                .fetchJoin()
                .leftJoin(member.project, project)
                .fetchJoin()
                .distinct()
                .where(member.memberType.eq(MemberType.CANDIDATE),
                        member.project.id.eq(projectId))
                .fetch();
        ArrayList<UserResDTO> userResList = userList.stream().map(user -> UserResDTO.entityToDto(user)).collect(Collectors.toCollection(ArrayList::new));
        for (int i = 0; i < userList.size(); i++) {
            int finalI = i;
            userList.get(i).getMembers().stream().forEach(member -> {
                if (member.getProject().getId() == projectId) {
                    userResList.get(finalI).setPosition(member.getPosition().getPositionName());
                }
            });
        }

        return userResList;
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
        return field == null ? null : project.field.in(field);
    }

    private BooleanExpression regionEq(String region) {
        return isEmpty(region) ? null : project.region.eq(region);
    }

    private BooleanExpression purposeEq(List<String> purpose) {
        return purpose == null ? null : project.field.in(purpose);
    }

    private BooleanExpression positionContain(List<String> positions) {

        return positions == null ? null :
                project.positions.any().position.positionName.in(positions);
    }

    private BooleanExpression techContain(List<String> techStacks) {
        return techStacks == null ? null :
                project.techStack.any().stack.in(techStacks);
    }

    @Override
    public List<ProjectDTO> getTopByScore(Long userId) {
        List<Project> content = queryFactory
                .select(project).from(project)
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
                .orderBy(project.createdAt.desc())
                .offset(0)
                .limit(4)
                .fetch();

        List<ProjectDTO> projectDTOList = content.stream().map(e -> ProjectDTO.entityToDto(e, userId)).
                collect(Collectors.toCollection(ArrayList::new));
        return projectDTOList;
    }

}
