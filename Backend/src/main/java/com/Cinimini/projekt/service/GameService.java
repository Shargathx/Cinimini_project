package com.Cinimini.projekt.service;

import com.Cinimini.projekt.entity.DiscussionPoint;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.entity.GameStep;
import com.Cinimini.projekt.repository.GameRepository;
import com.Cinimini.projekt.repository.GameStepRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GameService {

    private final GameStepRepository gameStepRepository;
    GameRepository gameRepository;

    public List<Game> getAllActive() {
        return gameRepository.findAllByActiveTrue();
    }

    public List<GameStep> getActiveGameSteps(Long id) {
        List<GameStep> allSteps = gameStepRepository.findAll();

        if (allSteps.isEmpty()) {
            throw new RuntimeException("No active steps for game found");
        }

        for (GameStep gameStep : allSteps) {
            List<DiscussionPoint> discussionPoints = gameStep.getDiscussionPoints();


            if (discussionPoints.isEmpty()) {
                throw new RuntimeException("No discussion points for game found");
            }

            if (gameStep.getDiscussionPoints().get()
        }



        return allSteps;


    }
}
