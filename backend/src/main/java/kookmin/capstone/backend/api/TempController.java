package kookmin.capstone.backend.api;

import kookmin.capstone.backend.service.FastApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TempController {

    private final FastApiService fastApiService;

    @GetMapping("/temp")
    public String temp() {
        return fastApiService.getMemberName(1L);
    }

    @GetMapping("/fastApi/create")
    public String create() {
        return fastApiService.createUser();
    }
}
