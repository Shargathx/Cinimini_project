package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class GameController {

    GameService gameService;

    @GetMapping("games")
    public List<Game> activeGames() {
        return gameService.getAllActive();
    }

}
