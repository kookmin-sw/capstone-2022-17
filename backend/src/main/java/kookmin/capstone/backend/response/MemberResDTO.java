package kookmin.capstone.backend.response;

import kookmin.capstone.backend.domain.member.MemberType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberResDTO {
    private String title;
    private String email;
    private MemberType memberType;
}
