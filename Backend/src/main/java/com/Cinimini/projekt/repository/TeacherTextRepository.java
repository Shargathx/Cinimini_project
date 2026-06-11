package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.GameStep;
import com.Cinimini.projekt.entity.TeacherText;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherTextRepository extends JpaRepository<TeacherText, Long> {
    List<TeacherText> findByGameStep_Game_Id(Long gameId);

    List<TeacherText> findByGameStep(GameStep savedStep);
}