package kookmin.capstone.backend.dto.memberDTO;

import io.swagger.annotations.ApiParam;
import kookmin.capstone.backend.domain.member.MemberType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestMemberDTO {

    private Long userId;
    @ApiParam(value = "프로젝트 ID", required = true, example = "1")
    private Long projectId;
    @ApiParam(value = "멤버 타입(서버에서 알아서 들어감)", required = false)
    private MemberType memberType;
    @ApiParam(value = "프로젝트 리더인지 판단", required = true, example = "true")
    private boolean leader;
}
