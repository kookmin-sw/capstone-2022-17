package kookmin.capstone.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class UserDTO {

    private Long id;
    private String nickname;
    private String avatar;
    private String instaId;
    private String blog;
    private String github;
}
