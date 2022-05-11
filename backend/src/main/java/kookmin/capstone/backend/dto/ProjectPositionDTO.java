package kookmin.capstone.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPositionDTO {

    private int total;
    private int currentCnt;
    private String positionName;
}
