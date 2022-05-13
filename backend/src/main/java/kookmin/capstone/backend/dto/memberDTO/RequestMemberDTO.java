package kookmin.capstone.backend.dto.memberDTO;

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
    private Long projectId;
    private MemberType memberType;
}