package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameSummaryDto {
    private Long id;
    private String name;
    private Long categoryId;
    private String description;
    private boolean active;
}
