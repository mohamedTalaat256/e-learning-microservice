package com.mtalaat.users.service.serviceImpl;

import com.mtalaat.users.mapper.CourseMapper;
import com.mtalaat.users.dto.CourseDto;
import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.Course;
import com.mtalaat.users.repository.CourseRepository;
import com.mtalaat.users.service.CourseService;
import com.mtalaat.users.service.client.UsersFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UsersFeignClient usersFeignClient;


    @Override
    public CourseDto saveCourse(CourseDto courseDto, String correlationId) {
        courseDto.setRating((float) 0);
        Course course = courseRepository.save(CourseMapper.toEntity(courseDto));
        InstructorDto instructor =  usersFeignClient.getInstructorById(correlationId, courseDto.getInstructor().getId()).getBody();

        return CourseMapper.toDto(course, instructor);

    }

    @Override
    public List<CourseDto> findAllCourses(String correlationId) {

        List<Course> coursesList = courseRepository.findAll();

        List<String> instructorIds = coursesList.stream()
                .map(Course::getInstructorId)
                .distinct()
                .toList();
        List<InstructorDto> instructors =  usersFeignClient.getInstructorsByIds(correlationId, instructorIds).getBody();

        return coursesList.stream().map(course -> {

            InstructorDto instructor = instructors.stream()
                    .filter(i -> i.getId().equals(course.getInstructorId()))
                    .findFirst()
                    .orElse(null);

            return CourseMapper.toDto(course, instructor);
        }).toList();
    }

    @Override
    public CourseDto findById(String correlationId, Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow();

        List<String> instructorIds =  new ArrayList<>(List.of(course.getInstructorId()));
        List<InstructorDto> instructors =  usersFeignClient.getInstructorsByIds(correlationId, instructorIds).getBody();

        return  CourseMapper.toDto(course, instructors.get(0));
    }



    @Override
    public Course updateCourse(Course course) {
        return null;
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id).orElseThrow();
        courseRepository.delete(course);
    }


    @Override
    public void deleteCourses(List<Long> ids) {
        ids.forEach(courseRepository::deleteById);
    }
}
