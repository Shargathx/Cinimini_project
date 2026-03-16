package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT question FROM Question question WHERE question.gameStep.id = :stepId AND question.isActive = true ORDER BY question.questionOrder ASC")
    List<Question> findOrderedActiveQuestions(@Param("stepId") Long stepId);
}
