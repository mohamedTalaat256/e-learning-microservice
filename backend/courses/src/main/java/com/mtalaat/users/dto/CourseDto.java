package com.mtalaat.users.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDto {

    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer discountPercentage;
    private String thumbnail;
    private Boolean isActive;
    private Float rating;

    private InstructorDto instructor;
    private CourseCategoryDto category;
}
