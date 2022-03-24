package kookmin.capstone.backend.domain;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class DateEntity {

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
