package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api") @Slf4j
@Api(tags = {"내 프로젝트 API"})
public class MyProjectApiController {

    private final ProjectService projectService;

    @GetMapping("/v1/myproject")
    @ApiOperation(value = "진행중인 프로젝트 조회")
    public ResponseEntity progress(HttpServletRequest request) {
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PROJECT_ADD_SUCCESS));
    }

}
