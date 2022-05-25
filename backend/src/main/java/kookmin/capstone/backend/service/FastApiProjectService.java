package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
@RequiredArgsConstructor
public class FastApiProjectService {

    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(1);

    private final WebClient fastApiClient = WebClient.create("http://54.87.37.39/project");

    public void createProject(Project project) {
//        ArrayList<String> memberList = project.getMembers().stream().map(e -> e.getUser().getId().toString()).collect(Collectors.toCollection(ArrayList::new));
        List<Map<String, Integer>> required_position = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();
        int sum = 0;
        for (ProjectPosition position : project.getPositions()) {
            int total = position.getTotal();
            sum += total;
            map.put(position.getPosition().getPositionName(), total);
        }

        required_position.add(map);

        ProjectRes projectRes = ProjectRes.builder().
                project_id(project.getId().toString()).
                manager_id(project.getUser().getId().toString()).
                member_id(Arrays.asList(project.getUser().getId().toString())).
                required_position(required_position).
                required_person(sum).
                tech_stack(project.getTechStack().stream().map(e -> e.getStack()).collect(Collectors.toCollection(ArrayList::new))).
                build();

        ProjectRes block = fastApiClient.post()
                .uri("/create")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(projectRes), ProjectRes.class)
                .retrieve()
                .bodyToMono(ProjectRes.class).block(REQUEST_TIMEOUT);

        log.info("project_id: " + block.project_id);
    }

    public void updateProject(Project project) {

        List<Map<String, Integer>> required_position = new ArrayList<>();

        Map<String, Integer> map = new HashMap<>();
        int sum = 0;
        for (ProjectPosition position : project.getPositions()) {
            int total = position.getTotal() - position.getCurrentCnt();
            sum += total;
            map.put(position.getPosition().getPositionName(), total);
        }

        required_position.add(map);

        ProjectRes projectRes = ProjectRes.builder().
                project_id(project.getId().toString()).
                manager_id(project.getUser().getId().toString()).
                member_id(project.getMembers().stream().map(e -> e.getUser().getId().toString()).collect(Collectors.toCollection(ArrayList::new))).
                required_position(required_position).
                required_person(sum).
                tech_stack(project.getTechStack().stream().map(e -> e.getStack()).collect(Collectors.toCollection(ArrayList::new))).
                build();

        ProjectRes block = fastApiClient.patch()
                .uri("/update")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(projectRes), ProjectRes.class)
                .retrieve()
                .bodyToMono(ProjectRes.class).block(REQUEST_TIMEOUT);

        log.info("project_id: " + block.project_id);
    }

    public List<Long> getRecommendUser(Long projectId, int num) {
        String[] block = fastApiClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path("/recommend")
                                .queryParam("pid", projectId)
                                .queryParam("num", num)
                                .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String[].class).block(REQUEST_TIMEOUT);

        return Stream.of(block).map(e -> Long.parseLong(e)).collect(Collectors.toCollection(ArrayList::new));
    }


    @Data
    @Builder @ToString
    @NoArgsConstructor @AllArgsConstructor
    public static class ProjectRes {
        private String project_id;
        private String manager_id;
        private int required_person;
        private List<String> member_id;
        private List<Map<String, Integer>> required_position;
        private List<String> tech_stack;
    }
}
