package com.Cinimini.projekt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;
    @Column(name = "is_active")
    private Boolean isActive;
    private Integer questionOrder;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_step_id")
    private GameStep gameStep;
}
