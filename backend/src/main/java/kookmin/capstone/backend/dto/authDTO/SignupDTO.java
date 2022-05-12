package kookmin.capstone.backend.dto.authDTO;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupDTO {

    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일은 공백일 수 없습니다.")
    private String email;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    @Size(min = 6, message = "비밀번호는 6자리 이상이어야 합니다.")
    private String password;

    @NotBlank(message = "확인 비밀번호는 공백일 수 없습니다.")
    @Size(min = 6, message = "비밀번호는 6자리 이상이어야 합니다.")
    private String repassword;

    @NotBlank(message = "닉네임은 공백일 수 없습니다.")
    private String nickname;
}
