package com.Cinimini.projekt.service;

import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public List<Category> getAllActive() {
        return categoryRepository.findAllByActiveTrue();
    }
}
