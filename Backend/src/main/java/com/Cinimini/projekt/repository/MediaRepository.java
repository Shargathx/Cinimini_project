package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.GameStep;
import com.Cinimini.projekt.entity.MediaElement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MediaRepository extends JpaRepository<MediaElement, Long> {
    Optional<MediaElement> findByGameStep(GameStep gameStep);
}
