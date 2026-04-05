package com.mtalaat.lectures.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaveLectureRequest {

    private Long id;
    private String title;
    private String description;
    private String url;
    private Integer order;

    private Long courseId;
    private Long sectionId;
}
