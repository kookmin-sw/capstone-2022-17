package kookmin.capstone.backend.dto.memberDTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberSignupRequestDto {

    private String email;
    private String password;
    private String name;
    private String nickName;
}
