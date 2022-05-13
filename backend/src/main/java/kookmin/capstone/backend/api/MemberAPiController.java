package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.member.MemberType;
import kookmin.capstone.backend.dto.memberDTO.RequestMemberDTO;
import kookmin.capstone.backend.exception.memberException.MemberAddException;
import kookmin.capstone.backend.exception.memberException.MemberException;
import kookmin.capstone.backend.repository.MemberRepository;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.MemberResDTO;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Api(tags = {"멤버 API"})
public class MemberAPiController {

    private final ProjectService projectService;
    private final JwtTokenService jwtTokenService;

    @PostMapping("/v1/member")
    @ApiImplicitParam(name = "requestMemberDTO", value = "userId랑 memberType은 필수 값 아님 userId는 프로젝트 리더일 때만 필수")
    @ApiOperation(value = "멤버 추가 및 프로젝트 지원")
    public ResponseEntity addMember(@RequestBody RequestMemberDTO requestMemberDTO, HttpServletRequest request) throws MemberException {
        Member member = null;
        if (!requestMemberDTO.isLeader()) {
            requestMemberDTO.setUserId(jwtTokenService.get(request, "id", Long.class));
            requestMemberDTO.setMemberType(MemberType.CANDIDATE);
        } else {
            requestMemberDTO.setMemberType(MemberType.INVITED);
        }
        try {
            member = projectService.addMember(requestMemberDTO);
        } catch (MemberAddException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, e.getMessage()));
        }
        MemberResDTO memberResDTO = MemberResDTO.builder().
                title(member.getProject().getTitle()).
                email(member.getUser().getEmail()).
                memberType(member.getMemberType()).
                build();
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_ADD_SUCCESS, memberResDTO));
    }

    @PatchMapping("/v1/member/join")
    @ApiOperation(value = "멤버 승인 및 거절")
    @ApiImplicitParam(name = "requestMemberDTO", value = "userId은 프로젝트 리더일 때만 필수, memberType 필수(REJECT => 거절 or MEMBER => 승인)")
    public ResponseEntity joinMember(@RequestBody RequestMemberDTO requestMemberDTO, HttpServletRequest request) {
        if (!requestMemberDTO.isLeader()) {
            requestMemberDTO.setUserId(jwtTokenService.get(request, "id", Long.class));
        }
        MemberResDTO memberResDTO = projectService.joinMember(requestMemberDTO);

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_CHANGE_STATUS_SUCCESS, memberResDTO));
    }
}
