package kookmin.capstone.backend.dto.authDTO;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import kookmin.capstone.backend.dto.userDTO.UserTechDTO;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor @AllArgsConstructor
public class AuthRequestDTO {
    private String accessToken;
    public UserDTO user;


    public static AuthRequestDTO entityToDto(User user, String accessToken) {
        return AuthRequestDTO.builder().
                accessToken(accessToken).
                user(UserDTO.builder().
                        avatar(user.getAvatar()).
                        id(user.getId()).
                        blog(user.getBlog()).
                        nickname(user.getNickname()).
                        instaId(user.getInstaId()).
                        github(user.getGithub()).
                        introduce(user.getIntroduce()).
                        build()).
                build();
    }

    @Data @Builder
    public static class UserDTO {
        public Long id;
        private String nickname;
        private String avatar;
        private String instaId;
        private String blog;
        private String github;
        private String introduce;
    }
}
