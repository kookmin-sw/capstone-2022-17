package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m where m.project.id =:projectId and m.user.id =:userId")
    Optional<Member> findMember(@Param("projectId") Long projectId, @Param("userId") Long userId);

    @Modifying
    @Query("delete from Member m where m.project.id =:projectId and m.user.id =:userId")
    void deleteMember(@Param("projectId") Long projectId, @Param("userId") Long userId);

    @Query("select m from Member m where m.user.id =:userId")
    List<Member> findMemberByUserId(@Param("userId") Long userId);

}
