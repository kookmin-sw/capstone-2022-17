package kookmin.capstone.backend.dto.userDTO;

import com.querydsl.core.annotations.QueryProjection;
import kookmin.capstone.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
public class UserResDTO {

    private Long userId;
    private String nickname;
    private String avatar;
    private Float rating;
    private String instaId;
    private String blog;
    private String github;
    private String introduce;

    private String position;

    @QueryProjection
    public UserResDTO(Long userId, String nickname, String avatar, Float rating, String instaId, String blog, String github, String introduce, String position) {
        this.userId = userId;
        this.nickname = nickname;
        this.avatar = avatar;
        this.rating = rating;
        this.instaId = instaId;
        this.blog = blog;
        this.github = github;
        this.introduce = introduce;
        this.position = position;
    }
    //TODO
    public static UserResDTO entityToDto(User user) {
        return UserResDTO.builder().
                userId(user.getId()).
                nickname(user.getNickname()).
                avatar(user.getAvatar()).
                rating(user.getRating()).
                instaId(user.getInstaId()).
                blog(user.getBlog()).
                github(user.getGithub()).
                introduce(user.getIntroduce()).
                build();
    }
}
