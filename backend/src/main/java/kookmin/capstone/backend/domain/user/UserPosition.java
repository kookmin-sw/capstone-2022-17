package kookmin.capstone.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Iterator;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class UserPosition {

    public UserPosition(int score, String positionName) {
        this.score = score;
        this.positionName = positionName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_position_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore()
    private User user;

    private int score;
    private String positionName;

    public void deleteUser(Iterator<UserPosition> iter) {
        iter.remove();
        this.user = null;
    }

    public void registToUser(User user) {
        this.user = user;
    }

}
