package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.entity.GameStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameStepRepository extends JpaRepository<GameStep, Long> {
    //    @EntityGraph(attributePaths = {"discussionPoints", "mediaElements"})
    @Query("SELECT gs FROM GameStep gs WHERE gs.game.id = :gameId")
    List<GameStep> findAllByGame_Id(Long gameId);

    List<GameStep> findByGame(Game existingGame);

    List<GameStep> findByGameId(Long gameId);

    List<GameStep> getGameStepsByGame(Game game);

    List<GameStep> getGameStepsByGame_Id(Long gameId);
}
