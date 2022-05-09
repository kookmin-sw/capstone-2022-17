package kookmin.capstone.backend.dto.authDTO.response;

import kookmin.capstone.backend.domain.user.User;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO {
    private String accessToken;
    private String nickname;
    private String email;
}
