package com.mtalaat.lectures.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LectureSectionDto {

    private Long id;
    private String title;
    private CourseDto course;
}
