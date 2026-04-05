package com.mtalaat.users.controller;


import com.mtalaat.users.dto.CourseCategoryDto;
import com.mtalaat.users.dto.CourseDto;
import com.mtalaat.users.entity.Course;
import com.mtalaat.users.service.serviceImpl.CourseCategoryServiceImpl;
import com.mtalaat.users.service.serviceImpl.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/api/categories", produces = {MediaType.APPLICATION_JSON_VALUE})
public class CourseCategoryController {


    @Autowired
    private CourseCategoryServiceImpl courseCategoryService;


    @GetMapping
    public ResponseEntity<Object> findAllCourses(@RequestHeader("mtalaat-correlation-id")
                                           String correlationId) {
        List<CourseCategoryDto> categories = courseCategoryService.findAllCategories(correlationId);
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }



}
