package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.Position;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.SimpleMemberDTO;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.exception.memberException.MemberAddException;
import kookmin.capstone.backend.exception.projectException.DuplicateProjectException;
import kookmin.capstone.backend.exception.projectException.ProjectException;
import kookmin.capstone.backend.repository.ProjectRepository;
import kookmin.capstone.backend.repository.ProjectTechRepository;
import kookmin.capstone.backend.repository.UserRepository;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectTechRepository projectTechRepository;

    @Transactional
    public void registProject(ProjectDTO dto) throws ProjectException {
        if (projectRepository.existsByTitle(dto.getTitle())) {
            throw new DuplicateProjectException("이미 등록된 프로젝트 입니다.");
        }
        Project project = dtoToToEntity(dto);
        projectRepository.save(project);
    }

    @Transactional
    public void modifyProject(ProjectDTO dto) {
        Optional<Project> findProject = projectRepository.findById(dto.getId());
        Project project = findProject.get();
        List<String> techStack = new ArrayList<>();
        List<ProjectTech> result = projectTechRepository.findByProject(project);
        result.stream().forEach(stack -> techStack.add(stack.getStack()));

        for (ProjectTech projectTech : result) {
            if (!dto.getTechStack().contains(projectTech.getStack())) {
                projectTechRepository.deleteById(projectTech.getId());
            } else {
                dto.getTechStack().remove(projectTech.getStack());
            }
        }

        dto.getTechStack().stream().forEach(stack -> project.addTechStack(new ProjectTech(stack)));


        project.chageProject(dto.getDescription(), dto.getThumbnail(), dto.getStatus(),
                dto.getTitle(), dto.getPurpose(), dto.getField(), dto.getRegion());
        project.changeStartDate(dto.getStartDate());
        project.changeEndDate(dto.getEndDate());

        projectRepository.save(project);

    }

    @Transactional
    public void removeProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Transactional
    public Member addMember(SimpleMemberDTO simpleMemberDTO) throws MemberAddException {
        User findUser = userRepository.findById(simpleMemberDTO.getUserId()).get();
        Project findProject = projectRepository.findById(simpleMemberDTO.getProjectId()).get();

        for (Member eachMember : findUser.getMembers()) {
            if (eachMember.getUser().equals(findUser)) {
                throw new MemberAddException("이미 존재하는 멤버입니다.");

            }
        }
        Member member = Member.builder().
                user(findUser).
                project(findProject).
                build();
        member.changeMember(findUser, findProject);
        return member;

    }

    public Project dtoToToEntity(ProjectDTO dto) {
        Optional<User> user = userRepository.findById(dto.getUserId());

        List<ProjectTech> techStack = new ArrayList<>();
        List<ProjectPosition> projectPositions = new ArrayList<>();

        Project project = Project.builder().
                title(dto.getTitle()).
                purpose(dto.getPurpose()).
                region(dto.getRegion()).
                startDate(dto.getStartDate()).
                endDate(dto.getEndDate()).
                description(dto.getDescription()).
                status(dto.getStatus()).
                field(dto.getField()).
                user(user.get()).
                thumbnail(dto.getThumbnail()).
                build();
        dto.getTechStack().stream().forEach(tech -> techStack.add(new ProjectTech(tech, project)));
        dto.getProjectPositions().stream().forEach(projectPositionDTO -> {
            projectPositions.add(ProjectPosition.builder().
                    total(projectPositionDTO.getTotal()).
                    currentCnt(projectPositionDTO.getCurrentCnt()).
                    position(Position.builder().
                            positionName(projectPositionDTO.getPositionName()).
                            build()).
                    project(project).
                    build());
        });

        project.initTechStack(techStack);
        project.initPosition(projectPositions);

        return project;
    }
}
