package kookmin.capstone.backend.service.jwt;

import kookmin.capstone.backend.dto.authDTO.response.UsernameFromTokenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenService jwtTokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더에서 JWT 를 받아옵니다.
        String requestTokenHeader = jwtTokenService.resolveToken((HttpServletRequest) request);
        String jwtToken =null;
        String email = null;
        if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")){
            jwtToken = requestTokenHeader.substring(7);
            try{
                email = jwtTokenService.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException ex){
                log.error("Unable to get JWT token", ex);
            } catch (UsernameFromTokenException ex) {
                log.error("token valid error:" + ex.getMessage() ,ex);
            } catch (Exception ex) {
                log.error("token valid error:" + ex.getMessage() ,ex);
                throw new RuntimeException("11 Username from token error");
            }
        }else{
            log.warn("JWT token does not begin with Bearer String");
        }

        // 유효한 토큰인지 확인
        if (email != null && jwtToken != null && jwtTokenService.validateToken(jwtToken)) {
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
            Authentication authentication = jwtTokenService.getAuthentication(jwtToken);
            // SecurityContext 에 Authentication 객체를 저장합니다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }


}