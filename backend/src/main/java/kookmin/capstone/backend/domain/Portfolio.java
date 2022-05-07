package kookmin.capstone.backend.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Portfolio {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "portfolio_id")
    private Long id;
}
