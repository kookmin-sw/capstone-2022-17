package kookmin.capstone.backend.api;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProjectApiController {

    private final ProjectService projectService;
    private final UserService userService;

    // 보낸 객체를 그대로
    @PostMapping("/v1/project")
    public ProjectDTO registProject(@RequestBody ProjectDTO dto) {
        Long id = projectService.registProject(dto);
        return dto;
    }

    @PostMapping("/v1/user")
    public CreateUserResponse registUser(@RequestBody User user) {
        Long id = userService.join(user);
        return new CreateUserResponse(id);
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
