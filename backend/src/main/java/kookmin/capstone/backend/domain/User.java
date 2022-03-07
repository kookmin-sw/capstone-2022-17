package kookmin.capstone.backend.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class User {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String nickname;
    private String password;
    private String phoneNumber;
    private String avatar;
    private String address;
    private Float rating;
    private String instaId;
    private String blog;
}
