package com.Cinimini.projekt.service;

import com.Cinimini.projekt.dto.*;
import com.Cinimini.projekt.entity.*;
import com.Cinimini.projekt.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
        List<Question> currentDbQuestions = questionRepository.findByGameStep(savedStep);
        Set<Long> remainingIds = new HashSet<>();

        int questionOrder = 1;

        if (stepRequest.getQuestions() != null) {
            for (QuestionDto question : stepRequest.getQuestions()) {
                Question questionEntity;

                if (question.getId() != null) {
                    remainingIds.add(question.getId());
                    questionEntity = questionRepository.findById(question.getId()).orElseThrow(() -> new RuntimeException("Question not found"));
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
        for (Question dbItem : currentDbQuestions) {
            if (!remainingIds.contains(dbItem.getId())) {
                questionRepository.delete(dbItem);
            }
        }
    }

    public void handleAndSaveTeacherTexts(GameStepRequest stepRequest, GameStep savedStep) {
        List<TeacherText> currentDbTeacherTexts = teacherTextRepository.findByGameStep(savedStep);
        Set<Long> remainingIds = new HashSet<>();

        int teacherOrder = 1;
        if (stepRequest.getTeacherTexts() != null && !stepRequest.getTeacherTexts().isEmpty()) {
            for (TeacherTextDto teacherText : stepRequest.getTeacherTexts()) {
                TeacherText teacherEntity;

                if (teacherText.getId() != null) {
                    remainingIds.add(teacherText.getId());
                    teacherEntity = teacherTextRepository.findById(teacherText.getId()).orElseThrow(() -> new RuntimeException("Teacher text not found"));
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
        for (TeacherText dbItem : currentDbTeacherTexts) {
            if (!remainingIds.contains(dbItem.getId())) {
                teacherTextRepository.delete(dbItem);
            }
        }
    }

    public void handleAndSaveDiscussionText(GameStepRequest stepRequest, GameStep savedStep) {
        List<DiscussionPoint> currentDbDiscussions = discussionPointRepository.findByGameStep(savedStep);
        Set<Long> remainingIds = new HashSet<>();

        int discussionPointOrder = 1;
        if (stepRequest.getDiscussionPoints() != null) {
            for (DiscussionDto discussionPoint : stepRequest.getDiscussionPoints()) {
                DiscussionPoint discussionEntity;

                if (discussionPoint.getId() != null) {
                    remainingIds.add(discussionPoint.getId());
                    discussionEntity = discussionPointRepository.findById(discussionPoint.getId()).orElseThrow(() -> new RuntimeException("Discussion point not found"));
                } else {
                    discussionEntity = new DiscussionPoint();
                }
                discussionEntity.setDiscussionText(discussionPoint.getDiscussionText());
                discussionEntity.setIsActive(true);
                discussionEntity.setDiscussionOrder(discussionPointOrder++);
                discussionEntity.setGameStep(savedStep);
                discussionPointRepository.save(discussionEntity);
            }

            for (DiscussionPoint dbItem : currentDbDiscussions) {
                if (!remainingIds.contains(dbItem.getId())) {
                    discussionPointRepository.delete(dbItem);
                }
            }


        }
    }

    public void validateSteps(CreateGameRequest gameRequest, boolean isCreate) {
        for (GameStepRequest step : gameRequest.getSteps()) {

            MultipartFile file = step.getImage();

            if (isCreate) {
                // 🟢 COMMENTED OUT: Allows empty images during game creation
                // if (file == null || file.isEmpty()) {
                //     throw new RuntimeException("Media file is empty");
                // }
                if (step.getQuestions() == null || step.getQuestions().isEmpty()) {
                    throw new RuntimeException("Questions is empty");
                }
                if (step.getDiscussionPoints() == null || step.getDiscussionPoints().isEmpty()) {
                    throw new RuntimeException("DiscussionPoints is empty");
                }
                if (step.getTeacherTexts() == null || step.getTeacherTexts().isEmpty()) {
                    throw new RuntimeException("TeacherTexts is empty");
                }
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
            // 🟢 COMMENTED OUT: Allows empty images during game updates/edits
            // else if (!isCreate && step.getExistingImageId() == null) {
            //     throw new RuntimeException("Every step must have either a new upload or an existing media reference");
            // }
        }
    }
}
