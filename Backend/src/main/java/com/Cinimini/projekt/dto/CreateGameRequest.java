package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGameRequest {
    private String name;
    private int categoryId;
    private String description;

    private List<GameStepRequest> steps;
    /*
    // COMMENT THIS IN FOR POSTMAN TESTING (COMMENT OUT THE ABOVE ONE)
    private List<GameStepRequest> steps = new ArrayList<>();
     */
}
