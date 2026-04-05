package com.mtalaat.lectures.controller;

import com.mtalaat.lectures.entity.LectureSection;
import com.mtalaat.lectures.service.serviceImpl.LectureSectionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lecture-sections")
public class lectureSectionController {

    @Autowired
    private LectureSectionServiceImpl lectureSectionService;

    @PostMapping("")
    public ResponseEntity<Object> save(@RequestBody LectureSection request) {
        return ResponseEntity.ok().body(lectureSectionService.saveLectureSection(request));
    }


    @GetMapping("/{courseId}")
    public ResponseEntity<Object> findbyCourseId( @PathVariable Long courseId) {
        return ResponseEntity.ok().body(lectureSectionService.findLectureSectionByCourseId(courseId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@RequestParam Long id) {
        lectureSectionService.deleteLectureSection(id);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteMultiple(@RequestParam Long[] ids) {
        lectureSectionService.deleteLectureSections(ids);
        return ResponseEntity.ok().body(null);
    }



}
