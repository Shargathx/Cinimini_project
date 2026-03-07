package com.Cinimini.projekt.controller;



import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.repository.GameInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GameController {

    private final GameInterface gameInterface;

    public GameController(GameInterface gameInterface) {
        this.gameInterface = gameInterface;
    }

    @GetMapping("/games/active")
    public List<Game> getActiveCategories(){
        List<Game> games = gameInterface.findAll();
        List<Game> active_games = new ArrayList<>(List.of());
        for (Game game : games) {
            if(game.is_active()){
                active_games.add(game);
            }
        }
        return active_games;
    }
}
