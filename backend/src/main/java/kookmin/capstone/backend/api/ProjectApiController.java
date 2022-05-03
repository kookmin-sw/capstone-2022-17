package kookmin.capstone.backend.api;

import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ProjectApiController {

    private final ProjectService projectService;
    private final UserService userService;

    // 보낸 객체를 그대로
    @PostMapping("/v1/project/regist")
    public ProjectDTO registProject(@RequestBody ProjectDTO dto) {
        projectService.registProject(dto);
        return dto;
    }

    @PostMapping("/v1/project/modify")
    public ProjectDTO modifyProject(@RequestBody ProjectDTO dto) {
        projectService.modifyProject(dto);
        return dto;
    }

    @PostMapping("/v1/project/remove")
    public ProjectDTO removeProject(@RequestBody ProjectDTO dto) {
        projectService.removeProject(dto.getId());
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

    @Getter
    static class TechStackDto {

        private String stack;

        public TechStackDto(TechStack techStack) {
            stack = techStack.getStack();
        }
    }
}
