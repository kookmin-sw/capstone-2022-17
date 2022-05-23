package kookmin.capstone.backend.api;

import kookmin.capstone.backend.service.FastApiUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TempController {

    private final FastApiUserService fastApiUserService;

    @GetMapping("/temp")
    public String temp() {
        return fastApiUserService.getMemberName(1L);
    }

    @GetMapping("/fastApi/create")
    public String create() {
        return fastApiUserService.createUser();
    }
}
