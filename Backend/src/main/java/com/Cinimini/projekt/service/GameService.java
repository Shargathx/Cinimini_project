package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.GameStepDto;
import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final CategoryRepository categoryRepository;
    private final TeacherTextRepository teacherTextRepository;

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

        if (game.getCategoryId() != categoryId) {
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
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        List<GameStep> allSteps = gameStepRepository.findAllByGame_Id(gameId);
        if (allSteps.isEmpty()) {
            throw new RuntimeException("No steps found for game: " + gameId);
        }

        List<GameStepDto> gameStepDtos = new ArrayList<>();

        List<Question> questions = questionRepository.findByGameStep_Game_Id(gameId);

        List<DiscussionPoint> discussions = discussionPointRepository.findByGameStep_Game_Id(gameId);

        List<MediaElement> media = mediaRepository.findByGameStep_Game_Id(gameId);

        List<TeacherText> teacherTexts = teacherTextRepository.findByGameStep_Game_Id(gameId);

        createAndMapDtos(allSteps, gameStepDtos, questions, discussions, teacherTexts, media);

        GameDto gameDto = new GameDto();
        gameDto.setGameId(game.getId());
        gameDto.setName(game.getName());
        gameDto.setCategoryId(game.getCategoryId());
        gameDto.setDescription(game.getDescription());
        gameDto.setGameSteps(gameStepDtos);
        return gameDto;
    }

    private void createAndMapDtos(List<GameStep> allSteps,
                                  List<GameStepDto> gameStepDtos,
                                  List<Question> questions,
                                  List<DiscussionPoint> discussions,
                                  List<TeacherText> teacherTexts, List<MediaElement> media) {
        for (GameStep step : allSteps) {

            List<QuestionDto> questionDtos = new ArrayList<>();
            List<DiscussionDto> discussionDtos = new ArrayList<>();
            List<TeacherTextDto> teacherTextDtos = new ArrayList<>();
            List<MediaDto> mediaDtos = new ArrayList<>();

            for (Question question : questions) {
                if (question.getGameStep().getId().equals(step.getId())) {
                    QuestionDto dto = new QuestionDto();
                    dto.setId(question.getId());
                    dto.setQuestionText(question.getQuestionText());
                    questionDtos.add(dto);
                }
            }

            for (DiscussionPoint discussionPoint : discussions) {
                if (discussionPoint.getGameStep().getId().equals(step.getId())) {
                    DiscussionDto dto = new DiscussionDto();
                    dto.setId(discussionPoint.getId());
                    dto.setDiscussionText(discussionPoint.getDiscussionText());
                    discussionDtos.add(dto);
                }
            }

            for (TeacherText teacherText : teacherTexts) {
                if (teacherText.getGameStep().getId().equals(step.getId())) {
                    TeacherTextDto teacherTextDto = new TeacherTextDto();
                    teacherTextDto.setId(teacherText.getId());
                    teacherTextDto.setTeacherText(teacherText.getTeacherText());
                    teacherTextDtos.add(teacherTextDto);
                }
            }

            for (MediaElement mediaElement : media) {
                if (mediaElement.getGameStep().getId().equals(step.getId())) {
                    MediaDto dto = new MediaDto();
                    dto.setId(mediaElement.getId());
                    dto.setMediaType(mediaElement.getMediaType());
                    dto.setFileName(mediaElement.getFileName());
                    dto.setFileData(mediaElement.getFileData());
                    mediaDtos.add(dto);
                }
            }

            GameStepDto dto = new GameStepDto();
            dto.setStepId(step.getId());
            dto.setQuestions(questionDtos);
            dto.setDiscussionPoints(discussionDtos);
            dto.setTeacherTexts(teacherTextDtos);
            dto.setMediaElements(mediaDtos);

            gameStepDtos.add(dto);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void addNewGame(CreateGameRequest gameRequest) throws IOException {
        System.out.println(MediaElement.class.getName());
        System.out.println(MediaElement.class.getClassLoader());

        validateGameData(gameRequest);

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
            handleAndSaveMediaFiles(stepRequest, savedStep);

            // HANDLE QUESTIONS
            handleAndSaveQuestions(stepRequest, savedStep);

            // HANDLE TEACHER TEXTS
            handleAndSaveTeacherTexts(stepRequest, savedStep);

            // HANDLE DISCUSSIONS
            handleAndSaveDiscussionText(stepRequest, savedStep);
        }
    }




    private static void validateGameData(CreateGameRequest gameRequest) {
        if (gameRequest.getName() == null || gameRequest.getName().isEmpty()) {
            throw new RuntimeException("Game name is empty");
        }
        if (gameRequest.getCategoryId() <= 0 || gameRequest.getCategoryId() >= 4) {
            throw new RuntimeException("Category id is out of range");
        }
        if (gameRequest.getSteps() == null || gameRequest.getSteps().isEmpty()) {
            throw new RuntimeException("Game steps are empty");
        }
        for (GameStepRequest stepRequest : gameRequest.getSteps()) {
            MultipartFile mediaFile = stepRequest.getImage();
            if (mediaFile == null || mediaFile.isEmpty()) {
                throw new RuntimeException("Media file is empty");
            }
            String contentType = mediaFile.getContentType();

            switch (gameRequest.getCategoryId()) {
                case 1: // Check for audio
                    if (contentType != null && !contentType.startsWith("audio/")) {
                        throw new RuntimeException("CategoryId 1 requires audio");
                    }
                    break;
                case 2:
                    if (contentType != null && !contentType.startsWith("video/")) {
                        throw new RuntimeException("CategoryId 2 requires video");
                    }
                    break;
                case 3:
                    if (contentType != null && !contentType.startsWith("image/")) {
                        throw new RuntimeException("CategoryId 3 requires image");
                    }
                    break;
            }
            if (stepRequest.getDiscussionPoints() == null || stepRequest.getDiscussionPoints().isEmpty()) {
                throw new RuntimeException("Discussion points are empty");
            }
            if (stepRequest.getQuestions() == null || stepRequest.getQuestions().isEmpty()) {
                throw new RuntimeException("Questions are empty");
            }
        }
    }

    private void handleAndSaveMediaFiles(GameStepRequest stepRequest, GameStep savedStep) throws IOException {
        MultipartFile multipartFile = stepRequest.getImage();
        MediaElement media = new MediaElement();
        media.setFileName(multipartFile.getOriginalFilename());
        media.setMediaType(multipartFile.getContentType());
        media.setFileData(multipartFile.getBytes());
        media.setGameStep(savedStep);
        mediaRepository.save(media);
    }

    private void handleAndSaveQuestions(GameStepRequest stepRequest, GameStep savedStep) {
        int questionOrder = 1;
        for (String question : stepRequest.getQuestions()) {
            Question questionEntity = new Question();
            questionEntity.setQuestionText(question);
            questionEntity.setIsActive(true);
            questionEntity.setQuestionOrder(questionOrder++);
            questionEntity.setGameStep(savedStep);
            questionRepository.save(questionEntity);
        }
    }

    private void handleAndSaveTeacherTexts(GameStepRequest stepRequest, GameStep savedStep) {
        int teacherOrder = 1;
        for (String teacherText : stepRequest.getTeacherTexts()) {
            TeacherText teacherEntity = new TeacherText();
            teacherEntity.setTeacherText(teacherText);
            teacherEntity.setIsActive(true);
            teacherEntity.setTextOrder(teacherOrder++);
            teacherEntity.setGameStep(savedStep);
            teacherTextRepository.save(teacherEntity);
        }
    }

    private void handleAndSaveDiscussionText(GameStepRequest stepRequest, GameStep savedStep) {
        int discussionPointOrder = 1;
        for (String discussionPoint : stepRequest.getDiscussionPoints()) {
            DiscussionPoint discussionText = new DiscussionPoint();
            discussionText.setDiscussionText(discussionPoint);
            discussionText.setIsActive(true);
            discussionText.setDiscussionOrder(discussionPointOrder++);
            discussionText.setGameStep(savedStep);
            discussionPointRepository.save(discussionText);
        }
    }


}
