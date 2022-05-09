package kookmin.capstone.backend.dto.authDTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupDTO {

    @Email(message = "Not Valid Email")
    @NotBlank(message = "이메일은 공백일 수 없습니다.")
    private String email;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    @Size(min = 6, message = "Not Valid Password length")
    private String password;

    @NotBlank(message = "확인 비밀번호는 공백일 수 없습니다.")
    @Size(min = 6, message = "Not Valid Password length")
    private String repassword;

    @NotBlank(message = "닉네임은 공백일 수 없습니다.")
    private String nickname;
}
