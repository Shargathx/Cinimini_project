package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class CategoriesController {

    CategoryService categoryService;

    @GetMapping("categories")
    public List<Category> activeCategories() {
        return categoryService.getAllActive();
    }

}
