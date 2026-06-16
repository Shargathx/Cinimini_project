package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.GameStepDto;
import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.CategoryRepository;
import com.Cinimini.projekt.repository.GameRepository;
import com.Cinimini.projekt.repository.GameStepRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class GameService {

    private final GameStepRepository gameStepRepository;
    private final GameRepository gameRepository;
    private final CategoryRepository categoryRepository;
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

    @Transactional
    public void validateAndSaveEditGameData(Long gameId, CreateGameRequest updateRequest) throws IOException {
        Game existingGame = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        if (updateRequest.getName() != null && !updateRequest.getName().equals(existingGame.getName())) {
            existingGame.setName(updateRequest.getName());
        }
        if (existingGame.getDescription() != updateRequest.getDescription()) {
            existingGame.setDescription(updateRequest.getDescription());
        }

        Map<Long, GameStep> existingStepsMap = gameStepRepository.getGameStepsByGame_Id(gameId)
                .stream()
                .collect(Collectors.toMap(GameStep::getId, step -> step));

        for (GameStepRequest stepRequest : updateRequest.getSteps()) {
            if (stepRequest.getMedia() != null && !stepRequest.getMedia().isEmpty()) {
                if (!validateMediaForCategory(updateRequest.getCategoryId(), stepRequest.getMedia())) {
                    throw new RuntimeException("Invalid media content");
                }
            }
            GameStep existingStep = existingStepsMap.get(stepRequest.getStepRequestId());
            if (existingStep != null) {
                gameStepService.handleAndSaveMediaFiles(stepRequest, existingStep);
                syncTeacherTexts(existingStep, stepRequest.getTeacherTexts());
                syncQuestions(existingStep, stepRequest.getQuestions());
                syncDiscussions(existingStep, stepRequest.getDiscussionPoints());
            }
        }
        gameRepository.save(existingGame);
    }

    private void syncDiscussions(GameStep existingStep, List<DiscussionDto> discussionDtos) {
        Map<Long, DiscussionPoint> existingDiscussions = existingStep.getDiscussionPoints().stream()
                .collect(Collectors.toMap(DiscussionPoint::getId, t -> t));
        for (DiscussionDto discussionDto : discussionDtos) {
            DiscussionPoint existingDiscussion = existingDiscussions.get(discussionDto.getId());
            if (existingDiscussion != null) {
                existingDiscussion.setDiscussionText(discussionDto.getDiscussionText());
            } else {
                existingDiscussion = new DiscussionPoint();
                existingDiscussion.setDiscussionText(discussionDto.getDiscussionText());
                existingStep.getDiscussionPoints().add(existingDiscussion);
            }
        }
    }

    private void syncQuestions(GameStep existingStep, List<QuestionDto> questionDtos) {
        Map<Long, Question> existingQuestions = existingStep.getQuestions().stream()
                .collect(Collectors.toMap(Question::getId, t -> t));
        for (QuestionDto questionDto : questionDtos) {
            Question existingQuestion = existingQuestions.get(questionDto.getId());
            if (existingQuestion != null) {
                existingQuestion.setQuestionText(questionDto.getQuestionText());
            } else {
                Question newQuestion = new Question();
                newQuestion.setQuestionText(questionDto.getQuestionText());
                existingStep.getQuestions().add(newQuestion);
            }
        }
    }

    private void syncTeacherTexts(GameStep existingStep, List<TeacherTextDto> dtos) {
        Map<Long, TeacherText> existingTexts = existingStep.getTeacherText().stream()
                .collect(Collectors.toMap(TeacherText::getId, t -> t));

        for (TeacherTextDto teacherTextdto : dtos) {
            TeacherText existing = existingTexts.get(teacherTextdto.getId());
            if (existing != null) {
                existing.setTeacherText(teacherTextdto.getTeacherText());
            } else {
                TeacherText newText = new TeacherText();
                newText.setTeacherText(teacherTextdto.getTeacherText());
                newText.setGameStep(existingStep);
                existingStep.getTeacherText().add(newText);
            }
        }
    }

    private Boolean validateMediaForCategory(Long categoryId, MultipartFile media) {
        if (media == null || media.isEmpty()) {
            return true; // no new file uploaded during edit
        }

        String mediaType = media.getContentType();

        return switch (categoryId.intValue()) {
            case 1 -> mediaType.startsWith("audio/");
            case 2 -> mediaType.startsWith("video/");
            case 3 -> mediaType.startsWith("image/");
            default -> false;
        };
    }

    @Transactional(rollbackFor = Exception.class)
    public void addNewGame(CreateGameRequest gameRequest) throws IOException {

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
            gameStepService.handleSavingNewQuestions(stepRequest, savedStep);

            // HANDLE TEACHER TEXTS
            gameStepService.handleSavingNewTeacherTexts(stepRequest, savedStep);

            // HANDLE DISCUSSIONS
            gameStepService.handleSavingNewDiscussionPoints(stepRequest, savedStep);
        }
    }

    public void updateGame(Long gameId, CreateGameRequest updateGameRequestJson) throws IOException {
        Game existingGame = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        validateAndSaveEditGameData(gameId, updateGameRequestJson);
        gameRepository.save(existingGame);
    }


    public void softDeleteGame(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Game not found with id: " + gameId));
        game.setActive(false);
        gameRepository.save(game);
    }

    public void deleteGameFully(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        List<GameStep> steps = gameStepRepository.findByGameId(gameId);
        for (GameStep gameStep : steps) {
            gameStepRepository.delete(gameStep);
        }
        gameRepository.delete(game);
    }


}
