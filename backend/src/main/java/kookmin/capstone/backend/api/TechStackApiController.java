package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.dto.TechStackDTO;
import kookmin.capstone.backend.dto.authDTO.response.ResponseDTO;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.TechStackService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
@Api(tags = {"테크 스택 API"})
public class TechStackApiController {

    private final TechStackService techStackService;

    @GetMapping("/v1/techStack/list")
    @ApiOperation(value = "테크 스택 조회")
    public ResponseEntity searchTech(HttpServletRequest request) {
        List<TechStackDTO> stackDTOList = techStackService.getTechStack(request.getQueryString().split("=")[1].replaceAll("%20", " "));

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.TECHSTACK_GET_SUCCESS, stackDTOList));
    }

}
