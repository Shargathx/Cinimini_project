package com.Cinimini.projekt.service;


import com.Cinimini.projekt.entity.Category;
import com.Cinimini.projekt.repository.CategoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryInterface categoryInterface;

    public List<Category> findAll() {
        return categoryInterface.findByactiveTrue();
    }
}
