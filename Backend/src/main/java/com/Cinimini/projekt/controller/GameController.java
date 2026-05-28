package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.dto.CreateGameRequest;
import com.Cinimini.projekt.dto.GameDto;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class GameController {

    GameService gameService;

    @GetMapping("games")
    public List<Game> getActiveGames() {
        return gameService.getAllActiveGames();
    }

    @GetMapping("games/category/{catId}")
    public List<Game> getActiveGamesByCategory(@PathVariable Long catId) {
        return gameService.getAllActiveGamesByCategory(catId);
    }

    @GetMapping("games/{gameId}/steps")
    public GameDto getActiveGameSteps(@PathVariable Long gameId) {
        return gameService.getActiveGameSteps(gameId);
    }

    @PostMapping(value = "/games/add-game", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addGame(
            @RequestPart("game")CreateGameRequest gameRequest,
            @RequestPart("images") List<MultipartFile> images
    )
        throws IOException {
            gameService.addNewGame(gameRequest, images);
    }

}
