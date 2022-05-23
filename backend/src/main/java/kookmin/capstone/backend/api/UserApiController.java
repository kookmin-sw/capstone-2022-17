package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.FastApiUserService;
import kookmin.capstone.backend.service.UserService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Api(tags = {"유저 API"})
public class UserApiController {

    private final UserService userService;
    private final JwtTokenService jwtTokenService;
    private final FastApiUserService fastApiUserService;

    @GetMapping("/v1/user/duplicate")
    @ApiOperation(value = "중복 닉네임 확인 API")
    public ResponseEntity checkNickName(@RequestParam String nickName) {
        if (userService.existUserByNickname(nickName)) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.DUPLICATED_NICKNAME));
        }
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.NICKNAME_CHECK, nickName));
    }

    @GetMapping("/v1/user")
    @ApiOperation(value = "유저 조회 API")
    public ResponseEntity getUser(@RequestParam Long userId) {

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_GET_SUCCESS, userService.findUserDTOById(userId)));
    }

    @PatchMapping("/v1/user")
    @ApiOperation(value = "유저 정보 업데이트 API")
    public ResponseEntity updateUser(@RequestBody UserDTO requestUserDTO, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        UserDTO userDTO = userService.updateUser(requestUserDTO, userId);

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_UPDATE_SUCCESS, userDTO));
    }

    @PatchMapping("/v1/user/tech")
    @ApiOperation(value = "유저 테크 스텍 업데이트 API")
    public ResponseEntity updateUserTech(@RequestBody List<String> userTechList, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        fastApiUserService.updateUserTech(userId, userTechList);
        UserDTO userDTO = userService.updateUserTech(userTechList, userId);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_TECH_ADD_SUCCESS, userDTO));
    }

    @PatchMapping("/v1/user/position")
    @ApiOperation(value = "유저 포지션 업데이트 API")
    public ResponseEntity updateUserPosition(@RequestBody Set<UserPositionDTO> userPositionList, HttpServletRequest request) {
        Long userId = jwtTokenService.get(request, "id", Long.class);
        UserDTO userDTO = userService.updateUserPosition(userPositionList, userId);
        fastApiUserService.updateUserPosition(userDTO);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_POSITION_ADD_SUCCESS, userDTO));
//        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.USER_TECH_ADD_SUCESS));
    }
}
