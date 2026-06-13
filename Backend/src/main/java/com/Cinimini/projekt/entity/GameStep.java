package com.Cinimini.projekt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

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
    @JsonIgnore
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(mappedBy = "gameStep", cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 20)
    @OrderBy("discussionOrder ASC")
    private List<DiscussionPoint> discussionPoints;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "gameStep", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<MediaElement> mediaElements;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "gameStep", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("questionOrder ASC")
    private List<Question> questions;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "gameStep", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("textOrder ASC")
    private List<TeacherText> teacherText;
}
