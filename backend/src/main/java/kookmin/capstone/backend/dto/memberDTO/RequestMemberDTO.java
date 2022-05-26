package kookmin.capstone.backend.dto.memberDTO;

import io.swagger.annotations.ApiParam;
import kookmin.capstone.backend.domain.member.MemberType;
import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor @Builder
public class RequestMemberDTO {

    private Long userId;
    private Long projectId;
    private String positionName;
}
