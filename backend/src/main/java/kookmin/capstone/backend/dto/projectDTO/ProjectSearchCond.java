package kookmin.capstone.backend.dto.projectDTO;

import kookmin.capstone.backend.domain.ProjectTech;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProjectSearchCond {

    List<String> positions = new ArrayList<>();;
    List<String> techStacks = new ArrayList<>();
    List<String> field = new ArrayList<>();
    List<String> purpose = new ArrayList<>();;
    String region;
    String status;
    String title;
}
