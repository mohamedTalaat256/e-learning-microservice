package com.mtalaat.users.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    @Column(name = "thumbnail")
    @Lob
    private String thumbnail;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "instructor_id")
    private String instructorId;

    @Column(name = "rating")
    private Float rating;

    @ManyToOne
    private CourseCategory category;



}
