package kookmin.capstone.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberSignupRequestDto {

    private String email;
    private String password;
    private String name;
    private String nickName;
}
