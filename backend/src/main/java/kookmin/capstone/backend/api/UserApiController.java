package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.dto.UserDTO;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Api(tags = {"유저 API"})
public class UserApiController {

    private final UserService userService;

    @GetMapping("/v1/user")
    @ApiOperation(value = "중복 닉네임 확인 API")
    public ResponseEntity checkNickName(@RequestParam String nickName) {
        if (userService.existUserByNickname(nickName)) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.DUPLICATED_NICKNAME));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.NICKNAME_CHECK, nickName));
    }

    @PatchMapping("/v1/user")
    @ApiOperation(value = "유저 정보 업데이트 API")
    public ResponseEntity updateUser(UserDTO requestUserDTO) {
        UserDTO userDTO = userService.updateUser(requestUserDTO);

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_UPDATE_SUCCESS, userDTO));
    }
}
