package kookmin.capstone.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProjectSearchCond {

    List<String> position;
    List<String> teckStacks;
    List<String> field;
    List<String> purpose;
    String region;
    String status;
    String title;
}
