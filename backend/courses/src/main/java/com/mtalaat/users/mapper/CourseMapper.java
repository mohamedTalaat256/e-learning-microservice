package com.mtalaat.users.mapper;

import com.mtalaat.users.dto.CourseCategoryDto;
import com.mtalaat.users.dto.CourseDto;
import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.Course;
import com.mtalaat.users.entity.CourseCategory;

public class CourseMapper {

    public static CourseDto toDto(Course entity, InstructorDto instructorDto){

        CourseCategoryDto categoryDto = CourseCategoryDto.builder().id(entity.getCategory().getId())
                .title(entity.getCategory().getTitle())
                .description(entity.getCategory().getDescription())
                .build();
        return CourseDto.builder().
                id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .discountPercentage(entity.getDiscountPercentage())
                .thumbnail(entity.getThumbnail())
                .isActive(entity.getIsActive())
                .rating(entity.getRating())
                .category(categoryDto)
                .instructor(instructorDto)
                .build();
    }

    public static Course toEntity(CourseDto dto){

        return Course.builder().
                id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .discountPercentage(dto.getDiscountPercentage())
                .thumbnail(dto.getThumbnail())
                .isActive(dto.getIsActive())
                .rating(dto.getRating())
                .category(new CourseCategory(dto.getCategory().getId()))
                .instructorId(dto.getInstructor().getId())
                .build();
    }

}
