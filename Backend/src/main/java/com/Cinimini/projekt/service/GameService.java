package com.Cinimini.projekt.service;

import com.Cinimini.projekt.entity.Game;
import com.Cinimini.projekt.repository.GameInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GameService {

    GameInterface gameRepository;

    public List<Game> getAllActive() {
        return gameRepository.findAllByActiveTrue();
    }
}
