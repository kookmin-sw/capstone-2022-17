package kookmin.capstone.backend.api;

import io.swagger.annotations.*;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectRequestDTO;
import kookmin.capstone.backend.dto.projectDTO.ProjectSearchCond;
import kookmin.capstone.backend.exception.projectException.DuplicateProjectException;
import kookmin.capstone.backend.exception.projectException.ProjectException;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
@Api(tags = {"프로젝트 API"})
public class ProjectApiController {

    private final ProjectService projectService;
    private final JwtTokenService jwtTokenService;

    // 보낸 객체를 그대로
    @PostMapping("/v1/project")
    @ApiOperation(value = "프로젝트 등록")
    public ResponseEntity registProject(@RequestBody ProjectRequestDTO projectRequestDTO, HttpServletRequest request) throws ProjectException {
        // JWT 토큰에서 유저 ID 가져오기
        projectRequestDTO.setUserId(jwtTokenService.get(request, "id", Long.class));
        try {
            projectService.registProject(projectRequestDTO);
        } catch (DuplicateProjectException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, e.getMessage()));
        }
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

    @GetMapping("/v1/project/list")
    @ApiOperation(value = "프로젝트 조회")
    public Long list(@RequestParam("page") Long page, @RequestBody ProjectSearchCond condition) {

        return page;
    }

    @GetMapping("/v1/project/position")
    @ApiOperation(value = "프로젝트 현황 조회")
    public ResponseEntity getProjectPositionList(@RequestParam Long id) {
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.POSITION_GET_SUCCESS ,projectService.findProjectPositions(id)));
    }

    @GetMapping("/v1/project")
    @ApiOperation(value = "프로젝트 단건 조회")
    public ResponseEntity getProjectOne(@RequestParam Long id) {
        ProjectRequestDTO projectRequestDTO = projectService.findProjectDtoById(id);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_GET_SUCCESS, projectRequestDTO));
    }

    @GetMapping("/v1/project/main")
    @ApiOperation(value = "메인화면 프로젝트 조회")
    public ResponseEntity getMainProject() {
        Map<String, List<ProjectDTO>> mainProject = projectService.getMainProject();
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_MAIN_GET_SUCCESS, mainProject));
    }

    @PostMapping("/v1/project/like")
    @ApiOperation(value = "프로젝트 좋아요 API")
    public ResponseEntity addLike(@RequestBody ProjectRequestId projectRequestId, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        Long projectId = projectRequestId.getProjectId();
        if (!projectService.addLike(projectId, userId)) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.PROJECT_LIKE_ADD_FAIL));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.CREATED, ResponseMessage.PROJECT_LIKE_ADD_SUCCESS));
    }


    @ApiImplicitParam(name = "project", value = "projectId", required = true)
    @DeleteMapping("/v1/project/like")
    @ApiOperation(value = "프로젝트 좋아요 취소 API")
    public ResponseEntity unLike(@RequestBody ProjectRequestId projectRequestId, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        Long projectId = projectRequestId.getProjectId();
        if (!projectService.removeLike(projectId, userId)) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.PROJECT_LIKE_REMOVE_FAIL));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_LIKE_REMOVE_SUCCESS));
    }

    @Data @AllArgsConstructor
    static class CreatePojectResponse {
        private Long id;
    }

    @Data @AllArgsConstructor
    static class CreateUserResponse {
        private Long id;
    }

    @Data
    static class ProjectRequestId {
        private Long projectId;
    }
}
