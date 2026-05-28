package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameStepRequest {
    private MultipartFile image;
    private List<String> questions;
    private List<String> discussionPoints;

    /*
    // COMMENT THESE IN FOR POSTMAN TESTING (COMMENT OUT THE ABOVE ONE)
    private List<String> questions = new ArrayList<>();
    private List<String> discussionPoints = new ArrayList<>();
     */
}
