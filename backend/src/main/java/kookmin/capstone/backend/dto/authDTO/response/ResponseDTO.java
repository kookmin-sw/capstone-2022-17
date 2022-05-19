package kookmin.capstone.backend.dto.authDTO.response;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO {
    private String accessToken;
    private UserDTO userDTO;
}
