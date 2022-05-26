package kookmin.capstone.backend.dto.userDTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserPosition;
import kookmin.capstone.backend.domain.user.UserTech;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String nickname;
    private String avatar;
    private String instaId;
    private String blog;
    private String github;
    private String introduce;
    private List<UserTechDTO> userTechList;
    private Set<UserPositionDTO> userPositionSet;

    public static UserDTO entityToDto(User user) {
        return UserDTO.builder().
                id(user.getId()).
                nickname(user.getNickname()).
                avatar(user.getAvatar()).
                instaId(user.getInstaId()).
                blog(user.getBlog()).
                github(user.getGithub()).
                introduce(user.getIntroduce()).
                userTechList(user.getTechStack().stream().map(e -> UserTechDTO.entityToDto(e)).collect(Collectors.toCollection(ArrayList::new))).
                userPositionSet(user.getUserPositions().stream().map(e -> UserPositionDTO.entityToDto(e)).collect(Collectors.toCollection(HashSet::new))).
                build();
    }
}
