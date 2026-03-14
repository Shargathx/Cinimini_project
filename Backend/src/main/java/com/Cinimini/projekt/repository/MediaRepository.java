package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.MediaElement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<MediaElement, Long> {
}
