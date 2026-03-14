package com.Cinimini.projekt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "discussion_point")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String discussionText;
    private Boolean isActive;
    private Integer discussionOrder;

    @ManyToOne
    @JoinColumn(name = "game_step_id")
    GameStep gameStep;
}
