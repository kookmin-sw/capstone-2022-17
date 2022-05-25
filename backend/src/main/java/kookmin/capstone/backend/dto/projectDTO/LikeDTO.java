package kookmin.capstone.backend.dto.projectDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor
@Builder @NoArgsConstructor
public class LikeDTO {

    private boolean isLike;
    private int likes;
}
