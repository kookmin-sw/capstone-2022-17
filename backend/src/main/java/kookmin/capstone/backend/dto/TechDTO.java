package kookmin.capstone.backend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TechDTO {
    List<String> techNames = new ArrayList<>();
    String temp;
}
