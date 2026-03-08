package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Category;
import jakarta.persistence.Column;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryInterface extends JpaRepository<Category, Long> {

    List<Category> findAllByActiveTrue();
}
