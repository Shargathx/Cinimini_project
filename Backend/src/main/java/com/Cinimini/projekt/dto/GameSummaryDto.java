package com.Cinimini.projekt.dto;

import com.Cinimini.projekt.entity.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Game without its steps, for list views. Keeps the same JSON field names as the
 * Game entity so list consumers are unaffected, but leaves out steps and media bytes.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameSummaryDto {
    private Long id;
    private String name;
    private Long categoryId;
    private String description;
    private boolean active;

    public static GameSummaryDto from(Game game) {
        return new GameSummaryDto(
                game.getId(),
                game.getName(),
                game.getCategoryId(),
                game.getDescription(),
                game.isActive());
    }
}
