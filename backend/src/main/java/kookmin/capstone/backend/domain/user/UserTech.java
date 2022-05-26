package kookmin.capstone.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.userDTO.UserTechDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Iterator;

@Entity
@Getter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class UserTech {

    public UserTech(String stack) {
        this.stack = stack;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_tech_id")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    private String stack;

    public void registToUser(User user) {
        this.user = user;
    }

    public void deleteUser(Iterator<UserTech> iter) {
        iter.remove();
        this.user = null;
    }

//    public void deleteUserTech(Iterator<UserTech> iter) {
//        iter.remove();
//        this.user = null;
//    }

    public static UserTech dtoToEntity(UserTechDTO userTechDTO, User user) {
        return UserTech.builder().
                stack(userTechDTO.getUserTech()).
                user(user).
                build();
    }

    public void setUser(User user) {
        this.user = user;
    }

}
