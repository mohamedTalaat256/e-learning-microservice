package com.mtalaat.users.service;

import com.mtalaat.users.dto.CourseCategoryDto;

import java.util.List;

public interface CourseCategoryService {
    public List<CourseCategoryDto> findAllCategories(String correlationId);
}
