package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SingleGameDto {
    private String name;
    private String description;
    private List<GameStepDto> gameSteps;
}
