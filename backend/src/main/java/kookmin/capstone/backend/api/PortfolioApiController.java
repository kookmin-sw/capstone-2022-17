package kookmin.capstone.backend.api;

import io.swagger.annotations.Api;
import kookmin.capstone.backend.dto.portfolioDTO.PortfolioDTO;
import kookmin.capstone.backend.response.DefalutResponse;
import kookmin.capstone.backend.response.ResponseMessage;
import kookmin.capstone.backend.response.StatusCode;
import kookmin.capstone.backend.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Api(tags = {"포트폴리오 API"})
public class PortfolioApiController {

    private final PortfolioService portfolioService;

    @PostMapping("/v1/portfolio")
    public ResponseEntity create(@RequestBody PortfolioDTO portfolioDTO, HttpServletRequest request) {
        return ResponseEntity.ok(DefalutResponse.res(StatusCode.OK, ResponseMessage.PORTFOLIO_CREATE_SUCCESS, portfolioService.save(portfolioDTO)));
    }
}
