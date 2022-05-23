package kookmin.capstone.backend.api;

import kookmin.capstone.backend.service.FastApiProjectService;
import kookmin.capstone.backend.service.FastApiUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TempController {

    private final FastApiUserService fastApiUserService;
    private final FastApiProjectService fastApiProjectService;
    @GetMapping("/temp")
    public String temp() {
        return fastApiUserService.getMemberName(1L);
    }

    @GetMapping("/fastApi/create")
    public String create() {
        return fastApiUserService.createUser();
    }

    @GetMapping("/fastApi/project")
    public void project(@RequestParam Long userId, @RequestParam int num) {
        fastApiUserService.getRecommandProject(userId, num);
    }
}
