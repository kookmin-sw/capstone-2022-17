package kookmin.capstone.backend.repository;

import kookmin.capstone.backend.domain.Notification;
import kookmin.capstone.backend.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepositiory extends JpaRepository<Notification, Long> {

    List<Notification> findTop10ByMember_User_IdOrderByCreatedAtDesc(Long id);
}
