package com.mtalaat.lectures.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

}
