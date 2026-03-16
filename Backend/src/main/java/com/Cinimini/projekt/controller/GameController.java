package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.controller.dto.GameDto;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class GameController {

    GameService gameService;

    @GetMapping("games")
    public List<Game> getActiveGames() {
        return gameService.getAllActiveGames();
    }

    @GetMapping("games/{gameId}/steps")
    public GameDto getActiveGameSteps(@PathVariable Long gameId) {
        return gameService.getActiveGameSteps(gameId);
    }

}
