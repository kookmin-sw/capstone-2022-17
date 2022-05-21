package kookmin.capstone.backend.service;

import kookmin.capstone.backend.domain.Notification;
import kookmin.capstone.backend.domain.member.Member;
import kookmin.capstone.backend.dto.NotificationDTO;
import kookmin.capstone.backend.repository.MemberRepository;
import kookmin.capstone.backend.repository.NotificationRepositiory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationSerivce {

    private final MemberRepository memberRepository;
    private final NotificationRepositiory notificationRepositiory;

    public List<NotificationDTO> getNotificationList(Long userId) {
        List<Member> member = memberRepository.findMemberByUserId(userId);
        List<Notification> notificationList = notificationRepositiory.findTop10ByMember_User_IdOrderByCreatedAtDesc(member.get(0).getId());
        return notificationList.stream().map(e -> NotificationDTO.entityToDto(e)).collect(Collectors.toCollection(ArrayList::new));
    }
}
