package com.Cinimini.projekt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.annotation.Order;

import java.util.List;

@Entity
@Table(name = "game_step")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class GameStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer stepOrder;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(mappedBy = "gameStep")
    @OrderBy("discussionOrder ASC")
    private List<DiscussionPoint> discussionPoints;

    @OneToMany(mappedBy = "gameStep")
    @OrderBy("id ASC")
    private List<MediaElement> mediaElements;

    @OneToMany(mappedBy = "gameStep")
    @OrderBy("questionOrder ASC")
    private List<Question> questions;

    @OneToMany(mappedBy = "gameStep")
    @OrderBy("textOrder ASC")
    private List<TeacherText> teacherText;
}
