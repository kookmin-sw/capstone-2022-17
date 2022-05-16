package kookmin.capstone.backend.dto;

import kookmin.capstone.backend.domain.TechStack;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TechStackDTO implements Comparable<TechStackDTO> {
    String stack;

    public static TechStackDTO entityToDto(TechStack techStack) {
        return new TechStackDTO(techStack.getStack());
    }

    @Override
    public int compareTo(TechStackDTO o) {
        int compare = this.stack.compareTo(o.getStack());

        return compare < 0 ? -1: 1;
    }
}
