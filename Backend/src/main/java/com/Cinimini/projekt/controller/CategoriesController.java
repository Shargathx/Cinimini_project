package com.Cinimini.projekt.controller;

import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoriesController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/categories/active")
    private List<Category> activeCategories() {
        return categoryService.getAllActive();
    }

}
