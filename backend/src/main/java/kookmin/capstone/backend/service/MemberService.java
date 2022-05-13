package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member findMember(Long projectId, Long userId) {
        return memberRepository.findMember(projectId, userId).orElseThrow(EntityNotFoundException::new);
    }
}
