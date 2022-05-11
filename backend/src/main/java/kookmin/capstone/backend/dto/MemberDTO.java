package kookmin.capstone.backend.dto;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class MemberDTO {
    private ProjectDTO project;
}
