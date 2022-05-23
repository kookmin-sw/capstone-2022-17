package kookmin.capstone.backend.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.user.UserPosition;
import kookmin.capstone.backend.dto.authDTO.AuthRequestDTO;
import kookmin.capstone.backend.dto.userDTO.UserDTO;
import kookmin.capstone.backend.dto.userDTO.UserPositionDTO;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.digester.ArrayStack;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.persistence.*;
import java.time.Duration;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class FastApiService {

    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(1);

    private final WebClient fastApiClient = WebClient.create("http://54.87.37.39/user");

    public String getMemberName(Long user_id) {
        Flux<UserRes> user = fastApiClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path("/get/id")
                                .queryParam("user_id", user_id).build())
                .retrieve()
                .bodyToFlux(UserRes.class);

        UserRes userRes = user.blockFirst();
        System.out.println(userRes);
        return userRes.getUser_id();
    }

    public String createUser() {
        List<Map<String, Integer>> position_score = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();
        map.put("3", 5);
        position_score.add(map);
        UserRes userRes = UserRes.builder().
                user_id("7").
                previous_project(Arrays.asList("5", "10")).
                position_score(position_score).
                tech_stack(Arrays.asList("HTML", "CSS")).
                build();
        UserRes block = fastApiClient.post()
                .uri("/create")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRes), UserRes.class)
                .retrieve()
                .bodyToMono(UserRes.class).block(REQUEST_TIMEOUT);
        return "aaa";
    }

    public void createUser(AuthRequestDTO user) {


        UserRes userRes = UserRes.builder().
                user_id(user.getUser().getId().toString()).
                build();
        UserRes block = fastApiClient.post()
                .uri("/create")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRes), UserRes.class)
                .retrieve()
                .bodyToMono(UserRes.class).block(REQUEST_TIMEOUT);
        log.info("user_id: " + block.user_id);
    }

    public void updateUserPosition(UserDTO userDTO) {
        List<Map<String, Integer>> position_score = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();
        for (UserPositionDTO userPositionDTO : userDTO.getUserPositionSet()) {
            map.put(userPositionDTO.getPositionName(), userPositionDTO.getScore());
        }
        position_score.add(map);
        UserRes userRes = UserRes.builder().
                user_id(userDTO.getId().toString()).
                position_score(position_score).
                build();
        UserRes block = fastApiClient.post()
                .uri("/update")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRes), UserRes.class)
                .retrieve()
                .bodyToMono(UserRes.class).block(REQUEST_TIMEOUT);

    }

    public void updateUserTech(Long userId, List<String> userTechList) {

        UserRes userRes = UserRes.builder().
                user_id(userId.toString()).
                tech_stack(userTechList).
                build();

        UserRes block = fastApiClient.post()
                .uri("/update")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRes), UserRes.class)
                .retrieve()
                .bodyToMono(UserRes.class).block(REQUEST_TIMEOUT);
    }

    @Data @Builder
    @ToString @NoArgsConstructor
    @AllArgsConstructor
    public static class UserRes {
        private String user_id;
        private List<String> previous_project;
        private List<Map<String, Integer>> position_score;
        private List<String> tech_stack;
    }

}
