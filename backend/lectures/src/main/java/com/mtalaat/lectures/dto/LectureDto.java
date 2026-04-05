package com.mtalaat.lectures.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LectureDto {

    private Long id;
    private String title;
    private String description;
    private Integer order;
    private String url;

    private CourseDto course;
}
