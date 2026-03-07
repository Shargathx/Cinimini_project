package com.Cinimini.projekt.controller;


import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.repository.CategoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CategoriesController {

    @Autowired
    CategoryInterface categoryInterface;

    @GetMapping("/categories/active")
    private List<Category> findAll() {
        List<Category> categories = categoryInterface.findAll();
        List<Category> active_categories = new ArrayList<>(List.of());
        for (Category category : categories) {
            if(category.is_active()){
                active_categories.add(category);
            }
        }
        return active_categories;
    }
}
