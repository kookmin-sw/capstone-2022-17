package kookmin.capstone.backend;


import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.domain.project.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit1() {
            User user1 = createUser("test1234@test.com", "test1");
            User user2 = createUser("test5678@test.com", "test2");

            em.persist(user1);
            em.persist(user2);

            Project project1 = createProject("project1", "purpose1", user1);
            Project project2 = createProject("project2", "purpose2", user2);

            em.persist(project1);
            em.persist(project2);
        }

        private User createUser(String email, String nickname) {
            User user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .build();
            return user;
        }

        private Project createProject(String title, String purpose, User user) {
            Project project = Project.builder()
                    .title(title)
                    .purpose(purpose)
                    .user(user)
                    .build();
            return project;
        }
    }
}
