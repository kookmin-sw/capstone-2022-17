package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.Position;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.domain.member.MemberType;
import kookmin.capstone.backend.domain.project.Project;
import kookmin.capstone.backend.domain.project.ProjectPosition;
import kookmin.capstone.backend.domain.user.User;
import kookmin.capstone.backend.dto.memberDTO.DeleteMemberDTO;
import kookmin.capstone.backend.dto.memberDTO.RequestMemberDTO;
import kookmin.capstone.backend.exception.memberException.DuplicateMemberException;
import kookmin.capstone.backend.exception.memberException.MemberAddException;
import kookmin.capstone.backend.exception.memberException.MemberException;
import kookmin.capstone.backend.repository.MemberRepository;
import kookmin.capstone.backend.response.MemberResDTO;
import kookmin.capstone.backend.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserService userService;
    private final ProjectService projectService;

    public Member findMember(Long projectId, Long userId) {
        return memberRepository.findMember(projectId, userId).orElseThrow(EntityNotFoundException::new);
    }


    @Transactional
    public void addProjectLeader(Long userId, Project project, String leaderPositon) throws MemberException {
        User findUser = userService.findUserById(userId);

        Position findPosition = null;
        for (ProjectPosition projectPosition : project.getPositions()) {
            if (projectPosition.getPosition().getPositionName().equals(leaderPositon)) {
                findPosition = projectPosition.getPosition();
                break;
            }
        }

        Member member = Member.builder().
                user(findUser).
                project(project).
                memberType(MemberType.MEMBER).
                position(findPosition).
                build();
        Member savedMember = memberRepository.save(member);
        projectService.addProjectPostionCnt(savedMember.getPosition());

    }

    @Transactional
    public Member addMember(RequestMemberDTO requestMemberDTO, MemberType memberType) throws MemberAddException {
        User findUser = userService.findUserById(requestMemberDTO.getUserId());
        Project findProject = projectService.findProjectById(requestMemberDTO.getProjectId());

        for (Member eachMember : findProject.getMembers()) {
            if (eachMember.getUser().equals(findUser)) {
                throw new MemberAddException("이미 존재하는 멤버입니다.");

            }
        }
//        findProject.getPositions().stream().forEach(position -> log.info(position.getPosition().getPositionName()));
        Position findPosition = null;
        for (ProjectPosition projectPosition : findProject.getPositions()) {
            if (projectPosition.getPosition().getPositionName().equals(requestMemberDTO.getPositionName())) {
                findPosition = projectPosition.getPosition();
                break;
            }
        }
        Member member = Member.builder().
                user(findUser).
                project(findProject).
                memberType(memberType).
                position(findPosition).
                build();
        member.changeMember(findUser, findProject);
        return member;
    }

    @Transactional
    public MemberResDTO joinMember(RequestMemberDTO requestMemberDTO) throws MemberException {
        Member findMember = memberRepository.findMember(requestMemberDTO.getProjectId(), requestMemberDTO.getUserId()).orElseThrow(EntityNotFoundException::new);

        if (findMember.getMemberType().equals(MemberType.MEMBER)) {
            throw new DuplicateMemberException(ResponseMessage.DUPLICATED_MEMBER);
        }else  {
            projectService.addProjectPostionCnt(findMember.getPosition());
        }
        findMember.updateMember(MemberType.MEMBER);

        MemberResDTO memberResDTO = MemberResDTO.builder().
                title(findMember.getProject().getTitle()).
                email(findMember.getUser().getEmail()).
                memberType(findMember.getMemberType()).
                build();

        return memberResDTO;
    }

    @Transactional
    public MemberResDTO rejectMember(RequestMemberDTO requestMemberDTO) {
        Member findMember = memberRepository.findMember(requestMemberDTO.getProjectId(), requestMemberDTO.getUserId()).orElseThrow(EntityNotFoundException::new);

        findMember.updateMember(MemberType.REJECT);

        MemberResDTO memberResDTO = MemberResDTO.builder().
                title(findMember.getProject().getTitle()).
                email(findMember.getUser().getEmail()).
                memberType(findMember.getMemberType()).
                build();

        return memberResDTO;
    }

    @Transactional
    public void deleteMember(DeleteMemberDTO memberDTO) {
        memberRepository.deleteMember(memberDTO.getProjectId(), memberDTO.getUserId());
    }
}
