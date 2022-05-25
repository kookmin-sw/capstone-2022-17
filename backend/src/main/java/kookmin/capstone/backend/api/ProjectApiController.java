package kookmin.capstone.backend.api;

import io.swagger.annotations.*;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.projectDTO.*;
import kookmin.capstone.backend.dto.userDTO.UserResDTO;
import kookmin.capstone.backend.exception.memberException.MemberException;
import kookmin.capstone.backend.exception.projectException.DuplicateProjectException;
import kookmin.capstone.backend.exception.projectException.LikeException;
import kookmin.capstone.backend.exception.projectException.ProjectException;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.MemberService;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
@Api(tags = {"프로젝트 API"})
public class ProjectApiController {

    private final ProjectService projectService;
    private final JwtTokenService jwtTokenService;
    private final MemberService memberService;

    // 보낸 객체를 그대로
    @PostMapping("/v1/project")
    @ApiOperation(value = "프로젝트 등록")
    public ResponseEntity registProject(@RequestBody ProjectRequestDTO projectRequestDTO, HttpServletRequest request) throws ProjectException, MemberException {
        // JWT 토큰에서 유저 ID 가져오기
        Long userId = jwtTokenService.get(request, "id", Long.class);
        projectRequestDTO.setUserId(userId);
        Project project = null;
        try {
            project = projectService.registProject(projectRequestDTO);
            projectRequestDTO.setId(project.getId());
        } catch (DuplicateProjectException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, e.getMessage()));
        }

        memberService.addProjectLeader(userId, project, projectRequestDTO.getLeaderPosition());
        projectRequestDTO.setProjectPositions(project.getPositions().stream().map(e -> ProjectPositionDTO.entityToDto(e)).
                collect(Collectors.toCollection(ArrayList::new))
                );
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_ADD_SUCCESS, projectRequestDTO));
    }

    @PatchMapping("/v1/project")
    @ApiOperation(value = "프로젝트 수정")
    public ProjectRequestDTO modifyProject(@RequestBody ProjectRequestDTO projectRequestDTO, HttpServletRequest request) {
        projectRequestDTO.setUserId(jwtTokenService.get(request, "id", Long.class));
        ProjectRequestDTO modifyProject = projectService.modifyProject(projectRequestDTO);
        return modifyProject;
    }

    @DeleteMapping("/v1/project")
    @ApiOperation(value = "프로젝트 삭제")
    public void removeProject(@RequestParam(name = "id") Long id, HttpServletRequest request) {
        projectService.removeProject(id);
    }

    @PostMapping("/v1/project/list")
    @ApiOperation(value = "프로젝트 둘러보기 검색 조회")
    public ResponseEntity list(@RequestBody ProjectSearchCond condition, @RequestParam("page") Integer page, @RequestParam("size") Integer size, HttpServletRequest request) {
        PageRequest pageRequest = PageRequest.of(page-1, size);
        Long userId = 0L;
        try {
            userId = jwtTokenService.get(request, "id", Long.class);
        } catch (Exception e) {
            log.error("토큰 정보가 없습니다.");
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_SEARCH_SUCCESS, projectService.getSearchProject(condition, pageRequest, userId)));
    }

    @GetMapping("/v1/project/position")
    @ApiOperation(value = "프로젝트 현황 조회")
    public ResponseEntity getProjectPositionList(@RequestParam Long id) {
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.POSITION_GET_SUCCESS ,projectService.findProjectPositions(id)));
    }

    @GetMapping("/v1/project")
    @ApiOperation(value = "프로젝트 단건 조회")
    public ResponseEntity getProjectOne(@RequestParam Long id, HttpServletRequest request) {
        Long userId = 0L;
        try {
            userId = jwtTokenService.get(request, "id", Long.class);
        } catch (Exception e) {
            log.error("토큰 정보가 없습니다.");
        }
        ProjectRequestDTO projectRequestDTO = projectService.findProjectDtoById(id, userId);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_GET_SUCCESS, projectRequestDTO));
    }

    @GetMapping("/v1/project/main")
    @ApiOperation(value = "메인화면 프로젝트 조회")
    public ResponseEntity getMainProject(HttpServletRequest request) {
        Long userId = 0L;
        try {
            userId = jwtTokenService.get(request, "id", Long.class);
        } catch (Exception e) {
            log.error("토큰 정보가 없습니다.");
        }
        Map<String, List<ProjectDTO>> mainProject = projectService.getMainProject(userId);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_MAIN_GET_SUCCESS, mainProject));
    }

    @PostMapping("/v1/project/like")
    @ApiOperation(value = "프로젝트 좋아요 API")
    public ResponseEntity addLike(@RequestBody Map<String, Long> project, HttpServletRequest request) {
        Long projectId = project.get("projectId");
        Long userId = jwtTokenService.get(request, "id", Long.class);
        LikeDTO likeDTO = projectService.addLike(projectId, userId);
        if (!likeDTO.isLike()) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.PROJECT_LIKE_ADD_FAIL, likeDTO));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.CREATED, ResponseMessage.PROJECT_LIKE_ADD_SUCCESS, likeDTO));
    }


    @DeleteMapping("/v1/project/like")
    @ApiOperation(value = "프로젝트 좋아요 취소 API")
    public ResponseEntity unLike(@RequestBody Map<String, Long> project, HttpServletRequest request) throws LikeException {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        LikeDTO likeDTO = null;
        Long projectId = project.get("projectId");

        try {
            likeDTO = projectService.removeLike(projectId, userId);
        } catch (LikeException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.PROJECT_LIKE_REMOVE_FAIL, likeDTO));
        }

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_LIKE_REMOVE_SUCCESS, likeDTO));
    }

    @GetMapping("/v1/project/join")
    @ApiOperation(value = "프로젝트 지원 현황 조회 API")
    public ResponseEntity getStatus(@RequestParam Long projectId, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        List<UserResDTO> projectApply = projectService.getProjectApply(projectId, userId);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_APPLY_GET_SUCCESS, projectApply));
    }

    @Data @AllArgsConstructor
    static class CreatePojectResponse {
        private Long id;
    }

    @Data @AllArgsConstructor
    static class CreateUserResponse {
        private Long id;
    }
}
