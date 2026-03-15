package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.MediaElement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<MediaElement, Long> {
    List<MediaElement> findAllByGameStepId(Long gameStepId);
}
