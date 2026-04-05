package com.mtalaat.lectures.mapper;

import com.mtalaat.lectures.dto.CourseDto;
import com.mtalaat.lectures.dto.LectureDto;
import com.mtalaat.lectures.dto.SaveLectureRequest;
import com.mtalaat.lectures.entity.Lecture;
import com.mtalaat.lectures.entity.LectureSection;

public class LectureMapper {

    public static LectureDto toDto(Lecture entity, CourseDto courseDto){


        return LectureDto.builder().
                id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .url(entity.getUrl())
                .order(entity.getOrder())
                .course(courseDto)
                .build();
    }

    public static Lecture requestToEntity(SaveLectureRequest request){

        return Lecture.builder().
                id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .url(request.getUrl())
                .order(request.getOrder())
                .courseId(request.getCourseId())
                .section(new LectureSection(request.getSectionId()))
                .build();
    }

    public static Lecture toEntity(LectureDto dto){

        return Lecture.builder().
                id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .url(dto.getUrl())
                .order(dto.getOrder())
                .courseId(dto.getCourse().getId())
                .build();
    }

}
