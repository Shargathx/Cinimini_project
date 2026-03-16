package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.entity.GameStep;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findAllByActiveTrue();
}
