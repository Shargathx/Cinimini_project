package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    @Query("SELECT g FROM Game g WHERE g.categoryId = :categoryId AND g.active = true")
    List<Game> getActiveGamesByCategory(@Param("categoryId") Long categoryId);

    List<Game> findAllByActiveTrue();
}
