package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.GameStepDto;
import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@AllArgsConstructor
@Service
public class GameService {

    private final GameStepRepository gameStepRepository;
    private final DiscussionPointRepository discussionPointRepository;
    private final MediaRepository mediaRepository;
    private final QuestionRepository questionRepository;
    private final GameRepository gameRepository;
    private final CategoryRepository categoryRepository;
    private final TeacherTextRepository teacherTextRepository;
    private final GameStepService gameStepService;

    public List<Game> getAllActiveGames() {
        return gameRepository.findAllByActiveTrue();
    }

    public List<Game> getAllActiveGamesByCategory(Long catId) {
        return gameRepository.getActiveGamesByCategory(catId);
    }

    public SingleGameDto getSingleGame(Long categoryId, Long gameId) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        if (!game.getCategoryId().equals(categoryId)) {
            throw new RuntimeException("Game does not belong to category");
        }

        List<GameStep> gameSteps = gameStepRepository.findAllByGame_Id(gameId);

        if (gameSteps.isEmpty()) {
            throw new RuntimeException("No steps found for game");
        }

        SingleGameDto singleGameDto = new SingleGameDto();
        singleGameDto.setName(game.getName());
        singleGameDto.setDescription(game.getDescription());

        List<GameStepDto> stepDtos = new ArrayList<>();
        for (GameStep gameStep : gameSteps) {
            GameStepDto gameStepDto = new GameStepDto();
            gameStepDto.setStepId(gameStep.getId());

            List<QuestionDto> questionDtos = new ArrayList<>();
            for (Question question : gameStep.getQuestions()) {
                QuestionDto questionDto = new QuestionDto();
                questionDto.setId(question.getId());
                questionDto.setQuestionText(question.getQuestionText());
                questionDtos.add(questionDto);
            }

            List<DiscussionDto> discussionDtos = new ArrayList<>();
            for (DiscussionPoint discussion : gameStep.getDiscussionPoints()) {
                DiscussionDto discussionPointDto = new DiscussionDto();
                discussionPointDto.setId(discussion.getId());
                discussionPointDto.setDiscussionText(discussion.getDiscussionText());
                discussionDtos.add(discussionPointDto);
            }

            List<TeacherTextDto> teacherTextDtos = new ArrayList<>();
            for (TeacherText teacherText : gameStep.getTeacherText()) {
                TeacherTextDto teacherTextDto = new TeacherTextDto();
                teacherTextDto.setId(teacherText.getId());
                teacherTextDto.setTeacherText(teacherText.getTeacherText());
                teacherTextDtos.add(teacherTextDto);
            }

            List<MediaDto> mediaDtos = new ArrayList<>();
            for (MediaElement media : gameStep.getMediaElements()) {
                MediaDto mediaDto = new MediaDto();
                mediaDto.setId(media.getId());
                mediaDto.setMediaType(media.getMediaType());
                mediaDto.setFileName(media.getFileName());
                mediaDto.setFileData(media.getFileData());
                mediaDtos.add(mediaDto);
            }
            gameStepDto.setQuestions(questionDtos);
            gameStepDto.setDiscussionPoints(discussionDtos);
            gameStepDto.setTeacherTexts(teacherTextDtos);
            gameStepDto.setMediaElements(mediaDtos);

            stepDtos.add(gameStepDto);
        }
        singleGameDto.setGameSteps(stepDtos);
        return singleGameDto;
    }

    public GameDto getActiveGameSteps(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        List<GameStep> allSteps = gameStepRepository.findAllByGame_Id(gameId);
        if (allSteps.isEmpty()) {
            throw new RuntimeException("No steps found for game: " + gameId);
        }

        List<GameStepDto> gameStepDtos = new ArrayList<>();

        for (GameStep step : allSteps) {
            GameStepDto stepDto = new GameStepDto();
            stepDto.setStepId(step.getId());

            List<QuestionDto> questionDtos = new ArrayList<>();
            for (Question question : step.getQuestions()) {
                QuestionDto dto = new QuestionDto();
                dto.setId(question.getId());
                dto.setQuestionText(question.getQuestionText());
                questionDtos.add(dto);
            }

            List<DiscussionDto> discussionDtos = new ArrayList<>();
            for (DiscussionPoint discussionPoint : step.getDiscussionPoints()) {
                DiscussionDto dto = new DiscussionDto();
                dto.setId(discussionPoint.getId());
                dto.setDiscussionText(discussionPoint.getDiscussionText());
                discussionDtos.add(dto);
            }

            List<TeacherTextDto> teacherTextDtos = new ArrayList<>();
            for (TeacherText teacherText : step.getTeacherText()) {
                TeacherTextDto teacherTextDto = new TeacherTextDto();
                teacherTextDto.setId(teacherText.getId());
                teacherTextDto.setTeacherText(teacherText.getTeacherText());
                teacherTextDtos.add(teacherTextDto);
            }

            List<MediaDto> mediaDtos = new ArrayList<>();
            for (MediaElement mediaElement : step.getMediaElements()) {
                MediaDto dto = new MediaDto();
                dto.setId(mediaElement.getId());
                dto.setMediaType(mediaElement.getMediaType());
                dto.setFileName(mediaElement.getFileName());
                dto.setFileData(mediaElement.getFileData());
                mediaDtos.add(dto);
            }

            stepDto.setQuestions(questionDtos);
            stepDto.setDiscussionPoints(discussionDtos);
            stepDto.setTeacherTexts(teacherTextDtos);
            stepDto.setMediaElements(mediaDtos);

            gameStepDtos.add(stepDto);
        }

        GameDto gameDto = new GameDto();
        gameDto.setGameId(game.getId());
        gameDto.setName(game.getName());
        gameDto.setCategoryId(game.getCategoryId());
        gameDto.setDescription(game.getDescription());
        gameDto.setGameSteps(gameStepDtos);
        return gameDto;
    }

    private void validateAddGameData(CreateGameRequest gameRequest) {
        if (gameRequest.getName() == null || gameRequest.getName().isEmpty()) {
            throw new RuntimeException("Game name is empty");
        }
        if (gameRequest.getCategoryId() == null || gameRequest.getCategoryId() <= 0 || gameRequest.getCategoryId() >= 4) {
            throw new RuntimeException("Category id is out of range or missing");
        }
        if (gameRequest.getSteps() == null || gameRequest.getSteps().isEmpty()) {
            throw new RuntimeException("Game steps are empty");
        }
        gameStepService.validateAddGameStepsData(gameRequest);
    }

    @Transactional(rollbackFor = Exception.class)
    public void addNewGame(CreateGameRequest gameRequest) throws IOException {
        System.out.println(MediaElement.class.getName());
        System.out.println(MediaElement.class.getClassLoader());

        validateAddGameData(gameRequest);

        Game game = new Game();
        game.setName(gameRequest.getName());
        game.setCategoryId(gameRequest.getCategoryId());
        game.setDescription(gameRequest.getDescription());
        game.setActive(true);
        Game savedGame = gameRepository.save(game);

//        // testing rollback
//        System.out.println("Before exception");
//        if (true) {
//            throw new RuntimeException("Transaction test");
//        }

        int stepOrder = 1;
        for (GameStepRequest stepRequest : gameRequest.getSteps()) {

            // HANDLE GENERAL STEP LOGIC
            GameStep gameStep = new GameStep();
            gameStep.setGame(savedGame);
            gameStep.setStepOrder(stepOrder++);
            GameStep savedStep = gameStepRepository.save(gameStep);

            // HANDLE MEDIA
            gameStepService.handleAndSaveMediaFiles(stepRequest, savedStep);

            // HANDLE QUESTIONS
            gameStepService.handleAndSaveQuestions(stepRequest, savedStep);

            // HANDLE TEACHER TEXTS
            gameStepService.handleAndSaveTeacherTexts(stepRequest, savedStep);

            // HANDLE DISCUSSIONS
            gameStepService.handleAndSaveDiscussionText(stepRequest, savedStep);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void editGameData(Long gameId, CreateGameRequest gameRequest) throws IOException {
        Game existingGame = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        List<GameStep> currentDatabaseSteps = gameStepRepository.findByGame(existingGame);
        Set<Long> newDatabaseSteps = new HashSet<>();
        // HashSet-i kasutame, et salvestada ID-d sinna ajutisel, et trackida, mis step-id
        // jäävad kustutamata ja mis mitte. Lihtsustab seda, kui ühel mängul on mitu step-i.

        if (gameRequest.getSteps() != null) {
            gameStepService.validateSteps(gameRequest, false);
        }

        for (int i = 0; i < gameRequest.getSteps().size(); i++) {
            GameStepRequest stepRequest = gameRequest.getSteps().get(i);
            int stepOrder = i + 1;

            if (stepRequest.getStepRequestId() != null) {
                newDatabaseSteps.add(stepRequest.getStepRequestId());

                GameStep gameStepEntity = gameStepRepository.findById(stepRequest.getStepRequestId()).orElseThrow(() -> new RuntimeException("Step not found"));
                gameStepEntity.setStepOrder(stepOrder);

                if (stepRequest.getImage() != null && !stepRequest.getImage().isEmpty()) {
//                    mediaRepository.deleteByGameStep(gameStepEntity);
                    gameStepService.handleAndSaveMediaFiles(stepRequest, gameStepEntity);
                }
                gameStepService.handleAndSaveQuestions(stepRequest, gameStepEntity);
                gameStepService.handleAndSaveDiscussionText(stepRequest, gameStepEntity);
                gameStepService.handleAndSaveTeacherTexts(stepRequest, gameStepEntity);

            } else {
                GameStep newStep = new GameStep();
                newStep.setGame(existingGame);
                newStep.setStepOrder(stepOrder);
                gameStepRepository.save(newStep);

                if (stepRequest.getImage() != null && !stepRequest.getImage().isEmpty()) {
                    gameStepService.handleAndSaveMediaFiles(stepRequest, newStep);
                }
                gameStepService.handleAndSaveQuestions(stepRequest, newStep);
                gameStepService.handleAndSaveDiscussionText(stepRequest, newStep);
                gameStepService.handleAndSaveTeacherTexts(stepRequest, newStep);
            }
        }
/*
        for (GameStep gameStep : currentDatabaseSteps) {
            if (!newDatabaseSteps.contains(gameStep.getId())) {
                gameStepRepository.delete(gameStep);
            }
        }

 */

        applyGameUpdates(gameRequest, existingGame);
        gameRepository.save(existingGame);
    }


    private static void applyGameUpdates(CreateGameRequest gameRequest, Game existingGame) {
        if (gameRequest.getName() != null && !existingGame.getName().equals(gameRequest.getName())) {
            existingGame.setName(gameRequest.getName());
        }
        if (gameRequest.getCategoryId() != null && !existingGame.getCategoryId().equals(gameRequest.getCategoryId())) {
            existingGame.setCategoryId(gameRequest.getCategoryId());
        }
        if (gameRequest.getDescription() != null && !existingGame.getDescription().equals(gameRequest.getDescription())) {
            existingGame.setDescription(gameRequest.getDescription());
        }
    }


    public void softDeleteGame(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Game not found with id: " + gameId));
        game.setActive(false);
        gameRepository.save(game);
    }


}
