package kookmin.capstone.backend.dto.memberDTO;

import kookmin.capstone.backend.dto.projectDTO.ProjectDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class MemberDTO {
    private ProjectDTO project;
}
