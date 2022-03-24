package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.dto.UserDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"테스트 해보는 Controller"})
@RequestMapping("/api")
public class TestController {

    @ApiOperation(value = "hello를 반환하는 메소드")
    @GetMapping("/test")
    public String test() {
        return "hello";
    }

    @ApiOperation(value = "UserDTO를 반환하는 메소드")
    @PostMapping("/user")
    public UserDTO testUser() {
        UserDTO userDTO = UserDTO.builder()
                .nickname("테스트 닉네임")
                .phoneNumber("010-1234-5678")
                .build();
        return userDTO;
    }

    @ApiOperation(value = "게시물 ID 반환하는 메소드")
    @ApiImplicitParam(name = "postId", value = "조회할 게시물 ID", required = true, dataType = "long")
    @GetMapping("/posts/{postId}")
    public Long postTest(@PathVariable final Long postId) {
        return postId;
    }

}
