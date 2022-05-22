package kookmin.capstone.backend.dto;

import kookmin.capstone.backend.domain.Notification;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class NotificationDTO {

    private Long id;
    private Long projectId;
    private String projectName;
    private String positionName;
    private boolean checked;
    public static NotificationDTO entityToDto(Notification notification) {
        return NotificationDTO.builder().
                projectId(notification.getMember().getProject().getId()).
                projectName(notification.getMember().getProject().getTitle()).
                positionName(notification.getMember().getPosition().getPositionName()).
                checked(notification.isChecked()).
                id(notification.getId()).
                build();
    }
}
