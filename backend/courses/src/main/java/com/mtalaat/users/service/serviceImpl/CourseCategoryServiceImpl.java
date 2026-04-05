package com.mtalaat.users.service.serviceImpl;


import com.mtalaat.users.dto.CourseCategoryDto;
import com.mtalaat.users.repository.CourseCategoryRepository;
import com.mtalaat.users.service.CourseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseCategoryServiceImpl implements CourseCategoryService {

    @Autowired
    CourseCategoryRepository courseCategoryRepository;

    @Override
    public List<CourseCategoryDto> findAllCategories(String correlationId) {
        return courseCategoryRepository.findAll().stream().map(cat ->
                CourseCategoryDto.builder().id(cat.getId())
                .title(cat.getTitle())
                .description(cat.getDescription())
                .build()).toList();
    }
}
