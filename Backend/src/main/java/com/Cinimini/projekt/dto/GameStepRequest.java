package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameStepRequest {

    private Long stepRequestId;
    private MultipartFile media;
    private Long existingImageId;

    private List<QuestionDto> questions = new ArrayList<>();
    private List<DiscussionDto> discussionPoints = new ArrayList<>();
    private List<TeacherTextDto> teacherTexts = new ArrayList<>();

    /*
    // COMMENT THESE IN FOR POSTMAN TESTING (COMMENT OUT THE ABOVE ONE)
    private List<String> questions = new ArrayList<>();
    private List<String> discussionPoints = new ArrayList<>();
     */
}
