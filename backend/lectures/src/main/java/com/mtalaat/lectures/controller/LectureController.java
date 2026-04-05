package com.mtalaat.lectures.controller;

 
import com.mtalaat.lectures.dto.LectureDto;
import com.mtalaat.lectures.dto.LectureSectionDto;
import com.mtalaat.lectures.dto.SaveLectureRequest;
import com.mtalaat.lectures.entity.LectureSection;
import com.mtalaat.lectures.service.serviceImpl.LectureSectionServiceImpl;
import com.mtalaat.lectures.service.serviceImpl.LectureServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(path="/api", produces = {MediaType.APPLICATION_JSON_VALUE})
public class LectureController {

    @Autowired
    private LectureServiceImpl lectureService;

    @Autowired
    private LectureSectionServiceImpl lectureSectionService;



    @GetMapping("/{courseId}")
    public ResponseEntity<Object> findAllLecturesbyCourseId(@RequestHeader("mtalaat-correlation-id")
                                           String correlationId, @PathVariable Long courseId) {
        List<LectureDto> lectures = lectureService.findAllLecturesByCourseId(correlationId, courseId);
        List<LectureSection> sections = lectureSectionService.findLectureSectionByCourseId(courseId);

        Map<String, Object> data = new HashMap<>();
        data.put("lectures", lectures);
        data.put("sections", sections);

 
        return ResponseEntity.status(HttpStatus.OK).body(data);
    }

    @PostMapping
    public  ResponseEntity<Object> saveLecture(@RequestHeader("mtalaat-correlation-id")
                                                   String correlationId, @RequestBody SaveLectureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(lectureService.saveLecture(request, correlationId));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deleteLecture(@PathVariable Long id) {
        lectureService.deleteLecture( id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteLectures(@RequestBody List<Long> ids) {
        lectureService.deleteLectures(ids);
        return ResponseEntity.ok().build();
    }
 

}
