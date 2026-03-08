package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping("/games/active")
    public List<Game> activeGames() {
        return gameService.getAllActive();
    }


}
