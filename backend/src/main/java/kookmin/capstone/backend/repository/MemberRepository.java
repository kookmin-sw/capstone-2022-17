package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
