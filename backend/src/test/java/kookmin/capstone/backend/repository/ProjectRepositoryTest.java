package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.project.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static kookmin.capstone.backend.repository.ProjectRepositoryTest.APPLICATION_LOCATIONS;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = APPLICATION_LOCATIONS)
class ProjectRepositoryTest {

    @Autowired private ProjectRepository projectRepository;


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

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:application-aws.yml";
}