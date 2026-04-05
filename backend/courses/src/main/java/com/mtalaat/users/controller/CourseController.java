package com.mtalaat.users.controller;


import com.mtalaat.users.dto.CourseCategoryDto;
import com.mtalaat.users.dto.CourseDto;
import com.mtalaat.users.entity.Course;
import com.mtalaat.users.service.serviceImpl.CourseCategoryServiceImpl;
import com.mtalaat.users.service.serviceImpl.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/api/courses", produces = {MediaType.APPLICATION_JSON_VALUE})
public class CourseController {

    @Autowired
    private CourseServiceImpl courseService;

    @Autowired
    private CourseCategoryServiceImpl courseCategoryService;


    @GetMapping
    public ResponseEntity<Object> findAllCourses(@RequestHeader("mtalaat-correlation-id")
                                           String correlationId) {
        List<CourseDto> courses = courseService.findAllCourses(correlationId);
        List<CourseCategoryDto> categories = courseCategoryService.findAllCategories(correlationId);

        Map<String, Object> data = new HashMap<>();

        data.put("courses", courses);
        data.put("categories", categories);

        return ResponseEntity.status(HttpStatus.OK).body(data);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Object> findById(@RequestHeader("mtalaat-correlation-id")
                                                 String correlationId, @PathVariable Long courseId) {
        return ResponseEntity.status(HttpStatus.OK).body(courseService.findById(correlationId, courseId));
    }


    @PostMapping
    public  ResponseEntity<Object> saveCourse(@RequestBody CourseDto course, @RequestHeader("mtalaat-correlation-id")
    String correlationId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.saveCourse(course, correlationId));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse( id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteCourses(@RequestBody List<Long> ids) {
        courseService.deleteCourses(ids);
        return ResponseEntity.ok().build();
    }

 /*   @GetMapping("/me")
    public Mono<Map<String, Object>> getMe(@AuthenticationPrincipal Jwt jwt) {
        return Mono.just(Map.of(
                "username", jwt.getClaimAsString("preferred_username"),
                "email", jwt.getClaimAsString("email"),
                "roles", jwt.getClaimAsStringList("roles")
        ));
    }
*/

}
