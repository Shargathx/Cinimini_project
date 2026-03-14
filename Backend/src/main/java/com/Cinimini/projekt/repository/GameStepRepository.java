package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.GameStep;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameStepRepository extends JpaRepository<GameStep, Long> {
    @EntityGraph(attributePaths = {"discussionPoints", "mediaElements"})
    List<GameStep> findAll();
}
