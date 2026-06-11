package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.DiscussionPoint;
import com.Cinimini.projekt.entity.GameStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiscussionPointRepository extends JpaRepository<DiscussionPoint, Long> {
    @Query("SELECT discussionPoint FROM DiscussionPoint discussionPoint WHERE discussionPoint.gameStep.id = :stepId AND discussionPoint.isActive = true ORDER BY discussionPoint.discussionOrder ASC")
    List<DiscussionPoint> findAllByGameStep_IdAndIsActiveTrue(@Param("stepId") Long gameStepId);

    List<DiscussionPoint> findByGameStep_Game_Id(Long gameId);

    List<DiscussionPoint> findByGameStep_IdAndIsActiveTrue(Long id);

    List<DiscussionPoint> findByGameStep(GameStep gameStep);
}
