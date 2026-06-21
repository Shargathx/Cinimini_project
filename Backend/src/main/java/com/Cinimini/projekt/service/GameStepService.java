package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.DiscussionPointRepository;
import com.Cinimini.projekt.repository.MediaRepository;
import com.Cinimini.projekt.repository.QuestionRepository;
import com.Cinimini.projekt.repository.TeacherTextRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@AllArgsConstructor
@Service
public class GameStepService {
    private final QuestionRepository questionRepository;
    private final MediaRepository mediaRepository;
    private final TeacherTextRepository teacherTextRepository;
    private final DiscussionPointRepository discussionPointRepository;
    private final jakarta.persistence.EntityManager entityManager;


    public void validateAddGameStepsData(CreateGameRequest gameRequest) {
        for (GameStepRequest stepRequest : gameRequest.getSteps()) {
            MultipartFile mediaFile = stepRequest.getMedia();
            if (mediaFile == null || mediaFile.isEmpty()) {
                throw new RuntimeException("Media file is empty");
            }
            String contentType = mediaFile.getContentType();

            switch (gameRequest.getCategoryId().intValue()) { // intValue to get around Long -> int conversion
                case 1: // Check for audio
                    if (contentType == null || !contentType.startsWith("audio/")) {
                        throw new RuntimeException("CategoryId 1 requires audio");
                    }
                    break;
                case 2: // Check for video
                    if (contentType == null || !(contentType.startsWith("video/") || contentType.equals("image/gif"))) {
                        throw new RuntimeException("CategoryId 2 requires video");
                    }
                    break;
                case 3: // Check for image
                    if (contentType == null || !contentType.startsWith("image/") || contentType.equals("image/gif")) {
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
        MultipartFile multipartFile = stepRequest.getMedia();
        if (multipartFile == null || multipartFile.isEmpty()) {
            return;
        }
        Optional<MediaElement> existingMediaElement = mediaRepository.findByGameStep(savedStep);
        MediaElement mediaElement;
        if (existingMediaElement.isPresent()) {
            mediaElement = existingMediaElement.get();
        } else {
            mediaElement = new MediaElement();
            mediaElement.setGameStep(savedStep);
        }
        mediaElement.setFileName(multipartFile.getOriginalFilename());
        mediaElement.setMediaType(multipartFile.getContentType());
        mediaElement.setFileData(multipartFile.getBytes());
        mediaElement.setGameStep(savedStep);
        mediaRepository.save(mediaElement);
    }


    public void handleSavingNewQuestions(GameStepRequest stepRequest, GameStep savedStep) {
        var questionOrder = 1;

        if (stepRequest.getQuestions() != null) {
            for (QuestionDto questionDto : stepRequest.getQuestions()) {
                Question toBeSavedQuestion = new Question();

                toBeSavedQuestion.setQuestionText(questionDto.getQuestionText());
                toBeSavedQuestion.setGameStep(savedStep);
                toBeSavedQuestion.setQuestionOrder(questionOrder++);
                toBeSavedQuestion.setIsActive(true);
                questionRepository.save(toBeSavedQuestion);
            }
        }
    }

    public void handleSavingNewDiscussionPoints(GameStepRequest stepRequest, GameStep savedStep) {
        var questionOrder = 1;

        if(stepRequest.getDiscussionPoints() != null) {
            for (DiscussionDto discussionDto : stepRequest.getDiscussionPoints()) {
                DiscussionPoint toBeSavedDiscussionPoint = new DiscussionPoint();

                toBeSavedDiscussionPoint.setDiscussionText(discussionDto.getDiscussionText());
                toBeSavedDiscussionPoint.setGameStep(savedStep);
                toBeSavedDiscussionPoint.setIsActive(true);
                toBeSavedDiscussionPoint.setDiscussionOrder(questionOrder++);
                discussionPointRepository.save(toBeSavedDiscussionPoint);
            }
        }
    }

    public void handleSavingNewTeacherTexts(GameStepRequest stepRequest, GameStep savedStep) {
        var questionOrder = 1;

        if (stepRequest.getTeacherTexts() != null) {
            for (TeacherTextDto teacherTextDto : stepRequest.getTeacherTexts()) {
                TeacherText toBeSavedTeacherText = new TeacherText();
                toBeSavedTeacherText.setTeacherText(teacherTextDto.getTeacherText());
                toBeSavedTeacherText.setGameStep(savedStep);
                toBeSavedTeacherText.setIsActive(true);
                toBeSavedTeacherText.setTextOrder(questionOrder++);
                teacherTextRepository.save(toBeSavedTeacherText);
            }
        }
    }
}
