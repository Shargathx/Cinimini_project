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
            MultipartFile mediaFile = stepRequest.getImage();
            if (mediaFile == null || mediaFile.isEmpty()) {
                throw new RuntimeException("Media file is empty");
            }
            String contentType = mediaFile.getContentType();
//            Long categoryId = gameRequest.getCategoryId();

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
/*
    public void handleAndSaveMediaFiles(GameStepRequest stepRequest, GameStep savedStep) throws IOException {
        MultipartFile multipartFile = stepRequest.getImage();
        if (multipartFile == null || multipartFile.isEmpty()) {
            return;
        }
//        String fileName = multipartFile.getOriginalFilename();
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

    public void handleAndSaveQuestions(GameStepRequest stepRequest, GameStep savedStep) {
        List<Question> currentDbQuestions = questionRepository.findByGameStep(savedStep);
        Set<Long> remainingIds = new HashSet<>();

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


 */

    //AI
    public void handleAndSaveDiscussionText(GameStepRequest stepRequest, GameStep savedStep) {
        List<DiscussionPoint> dbItems = discussionPointRepository.findByGameStep(savedStep);
        Map<Long, DiscussionPoint> dbMap = dbItems.stream()
                .collect(Collectors.toMap(DiscussionPoint::getId, item -> item));

        // 1. IDENTIFY ORPHANS & DELETE THEM FIRST
        // This clears the "slots" in the database so the unique constraint won't trigger
        if (stepRequest.getDiscussionPoints() != null) {
            Set<Long> requestIds = stepRequest.getDiscussionPoints().stream()
                    .map(DiscussionDto::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            for (DiscussionPoint dbItem : dbItems) {
                if (!requestIds.contains(dbItem.getId())) {
                    discussionPointRepository.delete(dbItem);
                    dbMap.remove(dbItem.getId());
                }
            }
        }
        discussionPointRepository.flush(); // Force DB to execute deletions NOW
        entityManager.clear();

        // 2. NOW Update or Create remaining items
        int newOrder = 1;
        for (DiscussionDto dto : stepRequest.getDiscussionPoints()) {
            if (dto.getId() != null && dbMap.containsKey(dto.getId())) {
                DiscussionPoint item = dbMap.get(dto.getId());
                item.setDiscussionText(dto.getDiscussionText());
                item.setDiscussionOrder(newOrder);
                item.setIsActive(true);
                discussionPointRepository.save(item);
            } else {
                DiscussionPoint newItem = new DiscussionPoint();
                newItem.setDiscussionText(dto.getDiscussionText());
                newItem.setDiscussionOrder(newOrder);
                newItem.setGameStep(savedStep);
                newItem.setIsActive(true);
                discussionPointRepository.save(newItem);
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
/*
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

 */
}
