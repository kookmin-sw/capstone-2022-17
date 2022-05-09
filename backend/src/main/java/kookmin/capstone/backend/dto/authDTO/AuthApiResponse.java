package kookmin.capstone.backend.dto.authDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthApiResponse {
    private int status = 200;
    private String message = "OK";
    private String code = "200";
    private Object data = "no data";
}
