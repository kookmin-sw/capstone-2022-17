package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.member.MemberType;
import kookmin.capstone.backend.dto.NotificationDTO;
import kookmin.capstone.backend.dto.memberDTO.DeleteMemberDTO;
import kookmin.capstone.backend.dto.memberDTO.RequestMemberDTO;
import kookmin.capstone.backend.exception.memberException.DuplicateMemberException;
import kookmin.capstone.backend.exception.memberException.MemberAddException;
import kookmin.capstone.backend.exception.memberException.MemberException;
import kookmin.capstone.backend.repository.MemberRepository;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.MemberResDTO;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.MemberService;
import kookmin.capstone.backend.service.NotificationSerivce;
import kookmin.capstone.backend.service.ProjectService;
import kookmin.capstone.backend.service.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Api(tags = {"멤버 API"})
public class MemberAPiController {

    private final JwtTokenService jwtTokenService;
    private final MemberService memberService;
    private final ProjectService projectService;
    private final NotificationSerivce notificationSerivce;

    @PostMapping("/v1/member")
    @ApiImplicitParam(name = "requestMemberDTO", value = "필수: positionName , 필수 아님: userId")
    @ApiOperation(value = "멤버 추가 및 프로젝트 지원")
    public ResponseEntity addMember(@RequestBody RequestMemberDTO requestMemberDTO, HttpServletRequest request) throws MemberException {
        Member member = null;
        Long userId = jwtTokenService.get(request, "id", Long.class);
        try {
            if (!projectService.isLeader(requestMemberDTO.getProjectId(), userId)) {
                requestMemberDTO.setUserId(userId);
                member = memberService.addMember(requestMemberDTO, MemberType.CANDIDATE);
            } else {
                member = memberService.addMember(requestMemberDTO, MemberType.INVITED);
            }
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
    @ApiOperation(value = "멤버 승인")
    @ApiImplicitParam(name = "requestMemberDTO", value = "필수: projectId 필수아님: userId, positionName")
    public ResponseEntity joinMember(@RequestBody RequestMemberDTO requestMemberDTO, HttpServletRequest request) throws MemberException {

        Long userId = jwtTokenService.get(request, "id", Long.class);
        boolean isLeader = projectService.isLeader(requestMemberDTO.getProjectId(), userId);
        if (!isLeader) {
            requestMemberDTO.setUserId(userId);
        }
        MemberResDTO memberResDTO = null;
        try {
            memberResDTO = memberService.joinMember(requestMemberDTO, isLeader);
        } catch(MemberAddException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, e.getMessage()));
        } catch (DuplicateMemberException e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.DUPLICATED_MEMBER));
        }

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_CHANGE_STATUS_SUCCESS, memberResDTO));
    }

    @PatchMapping("/v1/member/reject")
    @ApiOperation(value = "멤버 거절")
    @ApiImplicitParam(name = "requestMemberDTO", value = "필수: projectId, memberType(REJECT => 거절 or MEMBER => 승인) 필수아님: userId, positionName")
    public ResponseEntity rejectMember(@RequestBody RequestMemberDTO requestMemberDTO, HttpServletRequest request) throws MemberException {

        Long userId = jwtTokenService.get(request, "id", Long.class);
        if (!projectService.isLeader(requestMemberDTO.getProjectId(), userId)) {
            requestMemberDTO.setUserId(userId);
        }

        MemberResDTO memberResDTO = memberService.rejectMember(requestMemberDTO);

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_CHANGE_STATUS_SUCCESS, memberResDTO));
    }

    @DeleteMapping("/v1/member")
    @ApiOperation(value = "멤버 삭제")
    public ResponseEntity deleteMember(@RequestBody DeleteMemberDTO memberDTO, HttpServletRequest request) {
        memberDTO.setUserId(jwtTokenService.get(request, "id", Long.class));
        memberService.deleteMember(memberDTO);
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.MEMBER_DELETE_SUCCESS));
    }

    //TODO
    @GetMapping("/v1/member/notify")
    @ApiOperation(value = "멤버 알람")
    public ResponseEntity notify(HttpServletRequest request) {
        Long userId;
        try {
            userId = jwtTokenService.get(request, "id", Long.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.NOT_LOGIN));
        }
        List<NotificationDTO> notificationList = notificationSerivce.getNotificationList(userId);

        if (notificationList == null) {
            return ResponseEntity.badRequest().body(DefalutResponse.res(StatusCode.BAD_REQUEST, ResponseMessage.NOTIFY_GET_FAIL));
        }

        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.NOTIFY_GET_SUCCESS, notificationList));
    }

}
