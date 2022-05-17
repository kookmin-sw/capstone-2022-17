package kookmin.capstone.backend.dto.userDTO;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserTech;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter @Setter
public class UserDTO {

    private Long id;
    private String nickname;
    private String avatar;
    private String instaId;
    private String blog;
    private String github;
    private List<UserTech> userTechList;

    public static UserDTO entityToDto(User user) {
        return UserDTO.builder().
                id(user.getId()).
                nickname(user.getNickname()).
                avatar(user.getAvatar()).
                blog(user.getBlog()).
                github(user.getGithub()).
                userTechList(user.getTechStack()).
                build();
    }
}
