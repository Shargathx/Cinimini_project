package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@Service
public class GameStepService {
    private final QuestionRepository questionRepository;
    private final MediaRepository mediaRepository;
    private final TeacherTextRepository teacherTextRepository;
    private final DiscussionPointRepository discussionPointRepository;
    private GameStepRepository gameStepRepository;


    public void validateAddGameStepsData(CreateGameRequest gameRequest) {
        for (GameStepRequest stepRequest : gameRequest.getSteps()) {
            MultipartFile mediaFile = stepRequest.getImage();
            if (mediaFile == null || mediaFile.isEmpty()) {
                throw new RuntimeException("Media file is empty");
            }
            String contentType = mediaFile.getContentType();
            Long categoryId = gameRequest.getCategoryId();

            switch (gameRequest.getCategoryId().intValue()) { // intValue to get around Long -> int conversion
                case 1: // Check for audio
                    if (contentType != null && !contentType.startsWith("audio/")) {
                        throw new RuntimeException("CategoryId 1 requires audio");
                    }
                    break;
                case 2: // Check for video
                    if (contentType != null && !contentType.startsWith("video/")) {
                        throw new RuntimeException("CategoryId 2 requires video");
                    }
                    break;
                case 3: // Check for image
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

    public void handleAndSaveMediaFiles(GameStepRequest stepRequest, GameStep savedStep) throws IOException {
        MultipartFile multipartFile = stepRequest.getImage();
        MediaElement media = new MediaElement();
        media.setFileName(multipartFile.getOriginalFilename());
        media.setMediaType(multipartFile.getContentType());
        media.setFileData(multipartFile.getBytes());
        media.setGameStep(savedStep);
        mediaRepository.save(media);
    }

    public void handleAndSaveQuestions(GameStepRequest stepRequest, GameStep savedStep) {
        int questionOrder = 1;
        for (QuestionDto question : stepRequest.getQuestions()) {
            Question questionEntity;

            if (question.getId() != null) {
                questionEntity = questionRepository.findById(question.getId()).orElseGet(Question::new);
            } else {
                questionEntity = new Question();
            }

            questionEntity.setQuestionText(question.getQuestionText());
            questionEntity.setIsActive(true);
            questionEntity.setQuestionOrder(questionOrder++);
            questionEntity.setGameStep(savedStep);
            questionRepository.save(questionEntity);
        }
    }

    public void handleAndSaveTeacherTexts(GameStepRequest stepRequest, GameStep savedStep) {
        int teacherOrder = 1;
        for (TeacherTextDto teacherText : stepRequest.getTeacherTexts()) {
            TeacherText teacherEntity;

            if (teacherText.getId() != null) {
                teacherEntity = teacherTextRepository.findById(teacherText.getId()).orElseGet(TeacherText::new);
            } else {
                teacherEntity = new TeacherText();
            }
            teacherEntity.setTeacherText(teacherText.getTeacherText());
            teacherEntity.setIsActive(true);
            teacherEntity.setTextOrder(teacherOrder++);
            teacherEntity.setGameStep(savedStep);
            teacherTextRepository.save(teacherEntity);
        }
    }

    public void handleAndSaveDiscussionText(GameStepRequest stepRequest, GameStep savedStep) {
        int discussionPointOrder = 1;
        for (DiscussionDto discussionPoint : stepRequest.getDiscussionPoints()) {
            DiscussionPoint discussionText;

            if (discussionPoint.getId() != null) {
                discussionText = discussionPointRepository.findById(discussionPoint.getId()).orElseGet(DiscussionPoint::new);
            } else {
                discussionText = new DiscussionPoint();
            }
            discussionText.setDiscussionText(discussionPoint.getDiscussionText());
            discussionText.setIsActive(true);
            discussionText.setDiscussionOrder(discussionPointOrder++);
            discussionText.setGameStep(savedStep);
            discussionPointRepository.save(discussionText);
        }
    }

    public void validateSteps(CreateGameRequest gameRequest, Game existingGame, boolean isCreate) {
        for (GameStepRequest step : gameRequest.getSteps()) {

            MultipartFile file = step.getImage();

            if (isCreate && (file == null || file.isEmpty())) {
                throw new RuntimeException("Media file is empty");
            }
            if (isCreate && (step.getQuestions() == null || step.getQuestions().isEmpty())) {
                throw new RuntimeException("Questions is empty");
            }
            if (isCreate && step.getDiscussionPoints() == null || step.getDiscussionPoints().isEmpty()) {
                throw new RuntimeException("DiscussionPoints is empty");
            }
            if (isCreate && step.getTeacherTexts() == null || step.getTeacherTexts().isEmpty()) {
                throw new RuntimeException("TeacherTexts is empty");
            }

            if (file != null && !file.isEmpty()) {
                String contentType = file.getContentType();

                switch (gameRequest.getCategoryId().intValue()) {
                    case 1:
                        if (contentType != null && !contentType.startsWith("audio/"))
                            throw new RuntimeException("Audio required");
                        break;
                    case 2:
                        if (contentType != null && !contentType.startsWith("video/"))
                            throw new RuntimeException("Video required");
                        break;
                    case 3:
                        if (contentType != null && !contentType.startsWith("image/"))
                            throw new RuntimeException("Image required");
                        break;
                }
            }

            if (isCreate && (step.getDiscussionPoints() == null || step.getDiscussionPoints().isEmpty())) {
                throw new RuntimeException("Discussion points are empty");
            }

            if (isCreate && (step.getQuestions() == null || step.getQuestions().isEmpty())) {
                throw new RuntimeException("Questions are empty");
            }
        }
    }
}
