package kookmin.capstone.backend.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Portfolio {
    
    @Id @GeneratedValue
    @Column(name = "portfolio_id")
    private Long id;
}
