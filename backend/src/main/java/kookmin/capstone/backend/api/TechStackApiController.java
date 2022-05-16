package kookmin.capstone.backend.api;

import kookmin.capstone.backend.dto.TechStackDTO;
import kookmin.capstone.backend.dto.authDTO.response.ResponseDTO;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.TechStackService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TechStackApiController {

    private final TechStackService techStackService;

    @GetMapping("/v1/techStack/list")
    public ResponseEntity searchTech(@RequestParam String name) {
        List<TechStackDTO> stackDTOList = techStackService.getTechStack(name);

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.TECHSTACK_GET_SUCCESS, stackDTOList));
    }

}
