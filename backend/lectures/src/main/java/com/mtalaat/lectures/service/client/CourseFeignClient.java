package com.mtalaat.lectures.service.client;

import com.mtalaat.lectures.dto.CourseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("courses")
public interface CourseFeignClient {

    @GetMapping(value = "/api/courses/{courseId}",consumes = "application/json")
    ResponseEntity<CourseDto> getCourseById(@RequestHeader("mtalaat-correlation-id") String correlationId,
                                                 @PathVariable("courseId") Long courseId);

  }
