package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api") @Slf4j
@Api(tags = {"내 프로젝트 API"})
public class MyProjectApiController {

    private final ProjectService projectService;
    private final JwtTokenService jwtTokenService;


    @GetMapping("/v1/myproject")
    @ApiOperation(value = "마이 프로젝트 조회 API")
    public ResponseEntity progress(@RequestParam("page") Integer page, @RequestParam("size") Integer size,
                                   @RequestParam("type") MyProjectType type, HttpServletRequest request) {
        PageRequest pageRequest = PageRequest.of(page-1, size);
        Long userId = 0L;
        try {
            userId = jwtTokenService.get(request, "id", Long.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.NOT_LOGIN));
        }
        if (type == MyProjectType.PROGRESS) {
            return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MYPROJECT_IN_PROGRESS_GET_SUCCESS, projectService.getProgressProject(pageRequest, userId)));
        } else if (type == MyProjectType.DONE) {
            return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MYPROJECT_DONE_GET_SUCCESS, projectService.getDoneProject(pageRequest, userId)));

        } else if (type == MyProjectType.LIKES) {
            return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MYPROJECT_LIKES_GET_SUCCESS, projectService.getLikesProject(pageRequest, userId)));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.NO_CONTENT, "컨텐츠가 없습니다."));
    }




    enum MyProjectType {
        PROGRESS, DONE, LIKES
    }

}
