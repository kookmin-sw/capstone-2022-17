package kookmin.capstone.backend.api;

import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.dto.TechDTO;
import kookmin.capstone.backend.service.TechStackService;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TechStackApiController {

    private final TechStackService techStackService;

    @PostMapping("/techStack")
    public ResponseEntity<ApiResponse> createTechStack(@RequestBody TechDTO techDTO) {

        techStackService.registStack(techDTO);
        return new ResponseEntity<>(new ApiResponse(), HttpStatus.OK);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    static class ApiResponse {
        private int status = 200;
        private String message = "OK";
        private String code = "200";
    }

}
