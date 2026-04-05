package com.mtalaat.lectures.service;

import com.mtalaat.lectures.entity.LectureSection;

import java.util.List;

public interface LectureSectionService {

    LectureSection saveLectureSection(LectureSection lectureSection);
    List<LectureSection> findLectureSectionByCourseId(Long courseId);
    LectureSection updateLectureSection(LectureSection lectureSection);
    void deleteLectureSection(Long id);
    void deleteLectureSections(Long[] ids);

}
