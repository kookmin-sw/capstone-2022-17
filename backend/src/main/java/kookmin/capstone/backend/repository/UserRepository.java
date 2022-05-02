package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<User> findByName(String username);

//    @EntityGraph(attributePaths = {"roleSet"}, type = EntityGraph.EntityGraphType.LOAD)
//    @Query("select u from  User u where u.fromSocial = :social and u.email =:email")
//    Optional<User> findByEmail(@Param("email") String email, @Param("social") boolean social);

    Optional<User> findByEmail(String email);
}
