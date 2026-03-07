package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameInterface extends JpaRepository<Game, Long> {
}
