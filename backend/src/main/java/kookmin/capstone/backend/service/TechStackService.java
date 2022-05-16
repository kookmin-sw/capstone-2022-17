package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.TechStack;
import kookmin.capstone.backend.dto.TechStackDTO;
import kookmin.capstone.backend.repository.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.digester.ArrayStack;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TechStackService {

    private final TechStackRepository techStackRepository;

    public List<TechStackDTO> getTechStack(String name) {
        Pageable limitTen = PageRequest.of(0, 10);
        Pageable limitTen2 = PageRequest.of(0, 10);

        List<TechStackDTO> stackDTOList = new ArrayStack<>();
        techStackRepository.findByNameStart(name, limitTen).stream().forEach(techStack ->
        stackDTOList.add(TechStackDTO.entityToDto(techStack))
                );

        techStackRepository.findByNameContain(name, limitTen2).stream().forEach(techStack ->
                stackDTOList.add(TechStackDTO.entityToDto(techStack))
        );

        List<TechStackDTO> distinctList = stackDTOList.stream().distinct().collect(Collectors.toList());
//        Collections.sort(distinctList);
        return distinctList;
    }

}
