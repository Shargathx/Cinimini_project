package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
