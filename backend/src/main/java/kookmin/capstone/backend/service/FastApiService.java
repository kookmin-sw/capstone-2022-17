package kookmin.capstone.backend.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
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
        List<Map<String, Integer>> position_score = new ArrayList<Map<String, Integer>>();
        Map<String, Integer> map = new HashMap<String, Integer>();
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
