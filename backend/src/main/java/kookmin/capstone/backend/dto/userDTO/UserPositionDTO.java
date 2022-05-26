package kookmin.capstone.backend.dto.userDTO;

import kookmin.capstone.backend.domain.user.UserPosition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class UserPositionDTO {

    private String positionName;
    private int score;

    public static UserPositionDTO entityToDto(UserPosition userPosition) {
        return UserPositionDTO.builder().
                positionName(userPosition.getPositionName()).
                score(userPosition.getScore()).
                build();
    }
}
