package com.mtalaat.users.service;

import com.mtalaat.users.dto.CourseDto;
import com.mtalaat.users.entity.Course;

import java.util.List;

public interface CourseService {

    public CourseDto saveCourse(CourseDto course, String correlationId);
    public List<CourseDto> findAllCourses(String correlationId);
    public CourseDto findById(String correlationId, Long id);
    public Course updateCourse(Course course);
    public void deleteCourse(Long id);
    public void deleteCourses(List<Long> id);

}
