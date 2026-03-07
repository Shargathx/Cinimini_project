package com.Cinimini.projekt.repository;

import com.Cinimini.projekt.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryInterface extends JpaRepository<Category, Long> {
}
