package kookmin.capstone.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class UserDTO {

    private String nickname;
    private String phoneNumber;
    private String avatar;
    private String address;
    private Float rating;
    private String instaId;
    private String blog;
}
