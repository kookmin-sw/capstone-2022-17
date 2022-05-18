package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.Position;
import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectLike;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.project.ProjectStatus;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectRequestDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectPositionDTO;
import kookmin.capstone.backend.exception.memberException.MemberAddException;
import kookmin.capstone.backend.exception.memberException.MemberException;
import kookmin.capstone.backend.exception.projectException.DuplicateProjectException;
import kookmin.capstone.backend.exception.projectException.ProjectException;
import kookmin.capstone.backend.repository.projectRepository.ProjectLikeRepository;
import kookmin.capstone.backend.repository.projectRepository.ProjectPositionRepository;
import kookmin.capstone.backend.repository.projectRepository.ProjectRepository;
import kookmin.capstone.backend.repository.projectRepository.ProjectTechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final UserService userService;

    private final ProjectRepository projectRepository;
    private final ProjectTechRepository projectTechRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final ProjectLikeRepository projectLikeRepository;

    @Transactional
    public void registProject(ProjectRequestDTO dto) throws ProjectException {
        dto.setStatus(ProjectStatus.IN_PROGRESS);
        if (projectRepository.existsByTitle(dto.getTitle())) {
            throw new DuplicateProjectException("이미 등록된 프로젝트 입니다.");
        }
        Project project = dtoToToEntity(dto);
        project.initScore();
        projectRepository.save(project);
    }

    @Transactional
    public ProjectRequestDTO modifyProject(ProjectRequestDTO dto) {
        Project project = projectRepository.findById(dto.getId()).orElseThrow(EntityNotFoundException::new);
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

        return ProjectRequestDTO.entityToDto(project);
    }

    @Transactional
    public void removeProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project findProjectById(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return project;
    }

    @Transactional
    public ProjectRequestDTO findProjectDtoById(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        project.addViews();
        project.updateScore();
        return ProjectRequestDTO.entityToDto(project);
    }


    public List<ProjectPositionDTO> findProjectPositions(Long id) {
        Project findProject = projectRepository.findById(id).orElseThrow(EntityExistsException::new);
        List<ProjectPositionDTO> positionList = new ArrayList<>();

        for (ProjectPosition projectPosition : findProject.getPositions()) {
            positionList.add(ProjectPositionDTO.entityToDto(projectPosition));
        }

        return positionList;
    }

    @Transactional
    public void addProjectPostionCnt(Position position) throws MemberException {
        ProjectPosition findProjectPosition = projectPositionRepository.findByPosition(position);
        if (findProjectPosition.getCurrentCnt() < findProjectPosition.getTotal()) {
            findProjectPosition.addCnt();
        } else {
            throw new MemberAddException("포지션 정원이 초과 되었습니다.");
        }
    }

    public boolean isLeader(Long projectid, Long userid) {
        Long leaderId = projectRepository.findById(projectid).orElseThrow(EntityNotFoundException::new).getUser().getId();
        return leaderId == userid ? true : false;
    }

    @Transactional
    public boolean addLike(Long projectId, Long userId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(EntityNotFoundException::new);
        User findUser = userService.findUserById(userId);
        if (projectLikeRepository.existsUserLike(projectId, userId)) {
            return false;
        } else {
            findProject.like();
            findProject.updateScore();
            projectLikeRepository.save(new ProjectLike(findUser, findProject));
            return true;
        }
    }

    @Transactional
    public boolean removeLike(Long projectId, Long userId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(EntityNotFoundException::new);

        if (projectLikeRepository.existsUserLike(projectId, userId)) {
            findProject.unlike();
            findProject.updateScore();
            projectLikeRepository.deleteLike(projectId, userId);
            return true;
        } else {
            return false;
        }
    }

    public Map<String, List<ProjectDTO>> getMainProject() {
        Map<String, List<ProjectDTO>> mainProject = new HashMap<String, List<ProjectDTO>>();
        mainProject.put("topScore", projectRepository.getTopByScore());
        mainProject.put("topLatest", projectRepository.getTopByCreated());
        return mainProject;
    }

    public Project dtoToToEntity(ProjectRequestDTO dto) {
        User user = userService.findUserById(dto.getUserId());

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
                user(user).
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
