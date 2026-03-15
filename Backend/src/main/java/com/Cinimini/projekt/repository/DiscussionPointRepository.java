package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.DiscussionPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionPointRepository extends JpaRepository<DiscussionPoint, Long> {
    List<DiscussionPoint> findAllByGameStepIdAndIsActiveTrue(Long gameStepId);

}
