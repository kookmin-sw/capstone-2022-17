package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.Position;
import kookmin.capstone.backend.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PositionService {

    PositionRepository positionRepository;

    public Position findPostion(String position) {
        return positionRepository.findByPositionName(position).get();
    }
}
