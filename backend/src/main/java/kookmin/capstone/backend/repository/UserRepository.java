package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.nickname =:nickname")
    Optional<User> findUser(@Param("nickname") String nickName);

    @Query("select u from User u where u.id in :ids")
    List<User> findRecommend(@Param("ids") List<Long> ids);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickName);

    void deleteById(Long userId);
}
