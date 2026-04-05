package com.mtalaat.lectures.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "lectures")
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "lecture_order")
    private Integer order;

    @Column(name = "url")
    @Lob
    private String url;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "rating")
    private Float rating;


    @ManyToOne
    @JoinColumn(name = "section_id")
    @JsonBackReference
    private LectureSection section;


  
}
