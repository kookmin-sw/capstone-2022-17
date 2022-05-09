package kookmin.capstone.backend.dto.authDTO;

import lombok.Data;

@Data
public class SignupDTO {
    private String email;
    private String password;
    private String repassword;
    private String nickname;
}
