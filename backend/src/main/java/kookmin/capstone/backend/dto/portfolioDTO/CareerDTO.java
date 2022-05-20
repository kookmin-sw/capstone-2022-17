package kookmin.capstone.backend.dto.portfolioDTO;

import kookmin.capstone.backend.domain.portfolio.Career;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CareerDTO {

    private boolean isWorking;
    private String companyName;
    private String position;

    public static CareerDTO entityToDto(Career carrer) {
        return CareerDTO.builder().
                isWorking(carrer.isWorking()).
                companyName(carrer.getCompanyName()).
                position(carrer.getPosition()).
                build();
    }
}
