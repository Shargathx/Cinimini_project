package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameInterface extends JpaRepository<Game, Long> {

    List<Game> findAllByActiveTrue();
}
