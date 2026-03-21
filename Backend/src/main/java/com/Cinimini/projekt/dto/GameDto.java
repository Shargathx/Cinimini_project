package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class GameDto {
    private Long gameId;
    private String name;
    private int categoryId;
    private String description;
    private List<GameStepDto> gameSteps;
}
