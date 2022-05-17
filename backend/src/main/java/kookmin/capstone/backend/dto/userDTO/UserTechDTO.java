package kookmin.capstone.backend.dto.userDTO;

import kookmin.capstone.backend.domain.user.UserTech;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserTechDTO {

    String userTech;

    public static UserTechDTO entityToDto(UserTech userTech) {
        return new UserTechDTO(userTech.getStack());
    }
}
