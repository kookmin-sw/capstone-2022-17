package kookmin.capstone.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class Position {

    @Id @GeneratedValue
    @Column(name = "position_id")
    private Long id;

    private String position;
}
