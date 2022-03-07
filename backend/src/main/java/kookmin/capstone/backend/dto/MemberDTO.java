package kookmin.capstone.backend.dto;

import kookmin.capstone.backend.domain.Project;
import kookmin.capstone.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private User user;
    private Project project;
}
