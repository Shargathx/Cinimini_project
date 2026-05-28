package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.dto.CreateGameRequest;
import com.Cinimini.projekt.dto.GameDto;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class GameController {

    GameService gameService;

    @GetMapping("category/games")
    public List<Game> getActiveGames() {
        return gameService.getAllActiveGames();
    }

    @GetMapping("category/games/{catId}")
    public List<Game> getActiveGamesByCategory(@PathVariable Long catId) {
        return gameService.getAllActiveGamesByCategory(catId);
    }

    @GetMapping("category/games/{gameId}/steps")
    public GameDto getActiveGameSteps(@PathVariable Long gameId) {
        return gameService.getActiveGameSteps(gameId);
    }
/*
    // COMMENT THIS IN IF NEEDED, THE BELOW METHOD WORKS WITH POSTMAN, THIS ONE DOESNT
    @PostMapping(value = "/games/add-game", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addGame(
            @RequestPart("game") CreateGameRequest gameRequest
    )
            throws IOException {
        gameService.addNewGame(gameRequest);
    }
 */

    @PostMapping(value = "/games/add-game", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addGame(
            @ModelAttribute CreateGameRequest gameRequest) throws IOException {
        gameService.addNewGame(gameRequest);
    }

}
