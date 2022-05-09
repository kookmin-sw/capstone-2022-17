package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.dto.TechDTO;
import kookmin.capstone.backend.repository.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TechStackService {

    private final TechStackRepository techStackRepository;

    @Transactional
    public void registStack(TechDTO techDTO) {
        List<String> techNames = techDTO.getTechNames();

        for (String techName : techNames) {
            if (!techStackRepository.existsByStack(techName)) {
                TechStack techStack = TechStack.builder().
                        stack(techName).
                        build();
                techStackRepository.save(techStack);
            }
        }
    }

}
