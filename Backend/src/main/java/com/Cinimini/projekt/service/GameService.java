package com.Cinimini.projekt.service;

import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.repository.CategoryInterface;
import com.Cinimini.projekt.repository.GameInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    CategoryInterface categoryInterface;

    @Autowired
    GameInterface gameInterface;

    private void gameValidator(Game game){
        List<Long> catIds = new ArrayList<>();
        if (game.getId() != null) {
            throw new IllegalArgumentException("Cant add ID here");
        }
        for(Category category : categoryInterface.findAll()){
                catIds.add((long) category.getId());
        }
        if(!catIds.contains(game.getId())){
            throw new RuntimeException("Category id does not exist");
        }
    }

    public List<Game> getAllActive(){
        return gameInterface.findAllByActiveTrue();
    }
}
