package kookmin.capstone.backend.dto.authDTO;

import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import kookmin.capstone.backend.dto.userDTO.UserTechDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
//    private Long id;
//    private String nickname;
//    private String avatar;
//    private String instaId;
//    private String blog;
//    private String github;
    private UserDTO user;


    public static AuthRequestDTO entityToDto(User user, String accessToken) {
        return AuthRequestDTO.builder().
//                id(user.getId()).
//                accessToken(accessToken).
//                nickname(user.getNickname()).
//                avatar(user.getAvatar()).
//                blog(user.getBlog()).
//                github(user.getGithub()).
                user(UserDTO.entityToDto(user)).
                build();
    }
}
