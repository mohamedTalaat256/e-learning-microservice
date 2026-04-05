package com.mtalaat.users.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseCategoryDto {

    private Long id;
    private String title;
    private String description;
}
