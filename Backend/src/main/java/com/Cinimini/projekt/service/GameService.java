package com.Cinimini.projekt.service;

import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GameService {

    private final GameStepRepository gameStepRepository;
    private final DiscussionPointRepository discussionPointRepository;
    private final MediaRepository mediaRepository;
    private final QuestionRepository questionRepository;
    GameRepository gameRepository;

    public List<Game> getAllActive() {
        return gameRepository.findAllByActiveTrue();
    }

    public List<GameStep> getActiveGameSteps(Long gameId) {
        List<GameStep> allSteps = gameStepRepository.findAllById(gameId);

        if (allSteps.isEmpty()) {
            throw new RuntimeException("No active steps found for game: " + gameId);
        }

        // TODO: make DTOs of all objects that are being sent back and send back a DTO per for cycle
        // TODO: order DiscussionPoints from lowest to highest
        // TODO: order gameStep from lowest to highest (i think?)
//        ArrayList<GameStep> responses = new ArrayList<>();

        for (GameStep step : allSteps) {
            List<DiscussionPoint> activeDiscussionPoints = discussionPointRepository.findAllByGameStepIdAndIsActiveTrue(step.getId());
            List<MediaElement> mediaElements = mediaRepository.findAllByGameStepId(step.getId());
            List<Question> activeQuestions = questionRepository.getOrderedActiveQuestions(gameId);
            step.setDiscussionPoints(activeDiscussionPoints);
            step.setQuestions(activeQuestions);
        }
        return allSteps;
    }
}
