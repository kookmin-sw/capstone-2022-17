package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.dto.MemberDTO;
import kookmin.capstone.backend.dto.SimpleMemberDTO;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.dto.ProjectSearchCond;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.MemberResDTO;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
@Api(tags = {"프로젝트 API"})
public class ProjectApiController {

    private final ProjectService projectService;
    private final UserService userService;

    // 보낸 객체를 그대로
    @PostMapping("/v1/project")
    @ApiOperation(value = "프로젝트 등록")
    public ProjectDTO registProject(@RequestBody ProjectDTO projectDTO) {
        projectService.registProject(projectDTO);
        return projectDTO;
    }

    @PatchMapping("/v1/project")
    @ApiOperation(value = "프로젝트 수정")
    public ProjectDTO modifyProject(@RequestBody ProjectDTO projectDTO) {
        projectService.modifyProject(projectDTO);
        return projectDTO;
    }

    @DeleteMapping("/v1/project")
    @ApiOperation(value = "프로젝트 삭제")
    public void removeProject(@RequestParam(name = "id") Long id) {
        projectService.removeProject(id);
    }

//    @PostMapping("/v1/user")
//    @ApiOperation(value = "수정해야 됨 테스트용")
//    public CreateUserResponse registUser(@RequestBody User user) {
//        Long id = userService.join(user);
//        return new CreateUserResponse(id);
//    }

    @GetMapping("/v1/project/list")
    @ApiOperation(value = "프로젝트 조회")
    public Long list(@RequestParam("page") Long page, @RequestBody ProjectSearchCond condition) {

        return page;
    }

    @PostMapping("/v1/member")
    @ApiOperation(value = "멤버 추가")
    public ResponseEntity addMember(@RequestBody SimpleMemberDTO simpleMemberDTO) {
        Member member = projectService.addMember(simpleMemberDTO);

        MemberResDTO memberResDTO = MemberResDTO.builder().
                title(member.getProject().getTitle()).
                email(member.getUser().getEmail()).
                build();
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_ADD_SUCCESS, memberResDTO));
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
