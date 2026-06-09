package com.Cinimini.projekt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "teacher_info")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherText {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String teacherText;
    private Boolean isActive;

    @Column(name ="text_order", nullable = false)
    private Integer textOrder;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_step_id")
    private GameStep gameStep;
}
