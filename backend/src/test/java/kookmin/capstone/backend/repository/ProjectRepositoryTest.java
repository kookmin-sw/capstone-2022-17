package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.ProjectTech;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.dto.ProjectDTO;
import kookmin.capstone.backend.dto.ProjectSearchCond;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

import static kookmin.capstone.backend.repository.ProjectRepositoryTest.APPLICATION_LOCATIONS;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = APPLICATION_LOCATIONS)
public class ProjectRepositoryTest {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private ProjectTechRepository projectTechRepository;

    @Test
    void testFindTitle() {
        PageRequest pageRequest =
                PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "title"));

        Page<Project> result =
                projectRepository.findByTitleContaining("3", pageRequest);

        List<Project> projects = result.getContent();
        int totalPages = result.getTotalPages();
        boolean hasNextPage = result.hasNext();

        for (Project project : projects) {
            System.out.println(project.getTitle());
        }
    }

    @Test
    void testSearch() {
        ProjectSearchCond condition = new ProjectSearchCond();

        condition.setTitle("테스트");
//        List<String> field = new ArrayList<>();
//        field.add("해커톤");
//        field.add("캡스톤");
//        condition.setField(field);
//        condition.setTeckStacks(teckStack);
        List<ProjectDTO> results = projectRepository.search(condition);

        for (ProjectDTO result : results) {
            System.out.println(result);
        }
        Assertions.assertThat(results.size()).isEqualTo(3);
    }

    @Test
    void testFindTech() {
        Project findProject = projectRepository.findByTitle("테스트1");

        List<ProjectTech> result = projectTechRepository.findByProject(findProject);

        for (ProjectTech tech : result) {
            System.out.println(tech);
        }
    }

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:application-aws.yml";
}