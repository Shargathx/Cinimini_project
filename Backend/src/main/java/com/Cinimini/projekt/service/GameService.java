package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.GameStepDto;
import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class GameService {

    private final GameStepRepository gameStepRepository;
    private final DiscussionPointRepository discussionPointRepository;
    private final MediaRepository mediaRepository;
    private final QuestionRepository questionRepository;
    private final GameRepository gameRepository;

    public List<Game> getAllActiveGames() {
        return gameRepository.findAllByActiveTrue();
    }

    public List<Game> getAllActiveGamesByCategory(Long catId) {
        return gameRepository.getActiveGamesByCategory(catId);
    }

    public GameDto getActiveGameSteps(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        List<GameStep> allSteps = gameStepRepository.findAllById(gameId);
        if (allSteps.isEmpty()) {
            throw new RuntimeException("No active steps found for game: " + gameId);
        }
        List<GameStepDto> gameStepDtos = new ArrayList<>();

        createAndMapDtos(allSteps, gameStepDtos);

        GameDto gameDto = new GameDto();
        gameDto.setGameId(game.getId());
        gameDto.setName(game.getName());
        gameDto.setCategoryId(game.getCategoryId());
        gameDto.setDescription(game.getDescription());
        gameDto.setGameSteps(gameStepDtos);
        return gameDto;
    }

    private void createAndMapDtos(List<GameStep> allSteps, List<GameStepDto> gameStepDtos) {
        for (GameStep step : allSteps) {
            List<DiscussionDto> discussionDtos = new ArrayList<>();
            List<QuestionDto> questionDtos = new ArrayList<>();
            ArrayList<MediaDto> mediaDtos = new ArrayList<>();

            handleDiscussionDtoMapping(step, discussionDtos);
            handleQuestionDtoMapping(step, questionDtos);
            handleMediaElementDtoMapping(step, mediaDtos);

            GameStepDto gameStepDto = new GameStepDto();
            gameStepDto.setStepId(step.getId());
            gameStepDto.setDiscussionPoints(discussionDtos);
            gameStepDto.setQuestions(questionDtos);
            gameStepDto.setMediaElements(mediaDtos);
            gameStepDtos.add(gameStepDto);
        }
    }

    private void handleDiscussionDtoMapping(GameStep step, List<DiscussionDto> discussionDtos) {
        for (DiscussionPoint discussionPoint : discussionPointRepository.findAllByGameStepIdAndIsActiveTrue(step.getId())) {
            DiscussionDto discussionDto = new DiscussionDto();
            discussionDto.setId(discussionPoint.getId());
            discussionDto.setDiscussionText(discussionPoint.getDiscussionText());
            discussionDtos.add(discussionDto);
        }
    }

    private void handleMediaElementDtoMapping(GameStep step, List<MediaDto> mediaDtos) {
        for (MediaElement mediaElement : mediaRepository.findAllByGameStepId(step.getId())) {
            MediaDto mediaDto = new MediaDto();
            mediaDto.setId(mediaElement.getId());
            mediaDto.setUrl(mediaElement.getMediaType());
            mediaDtos.add(mediaDto);
        }
    }

    private void handleQuestionDtoMapping(GameStep step, List<QuestionDto> questionDtos) {
        for (Question question : questionRepository.findOrderedActiveQuestions(step.getId())) {
            QuestionDto questionDto = new QuestionDto();
            questionDto.setId(question.getId());
            questionDto.setQuestionText(question.getQuestionText());
            questionDtos.add(questionDto);
        }
    }
}
