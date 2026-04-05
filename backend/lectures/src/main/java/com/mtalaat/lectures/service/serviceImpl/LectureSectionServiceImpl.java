package com.mtalaat.lectures.service.serviceImpl;

import com.mtalaat.lectures.dto.CourseDto;
import com.mtalaat.lectures.dto.LectureSectionDto;
import com.mtalaat.lectures.entity.LectureSection;
import com.mtalaat.lectures.repository.LectureSectionRepository;
import com.mtalaat.lectures.service.LectureSectionService;
import com.mtalaat.lectures.service.client.CourseFeignClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureSectionServiceImpl implements LectureSectionService {

    @Autowired
    LectureSectionRepository lectureSectionRepository;

    @Autowired
    private CourseFeignClient courseFeignClient;

    Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Override
    public LectureSection saveLectureSection(LectureSection lectureSection) {
        return lectureSectionRepository.save(lectureSection);
    }

    @Override
    public List<LectureSection> findLectureSectionByCourseId(Long courseId) {
        return lectureSectionRepository.findByCourseId(courseId);
    }

    @Override
    public LectureSection updateLectureSection(LectureSection lectureSection) {
        return null;
    }

    @Override
    public void deleteLectureSection(Long id) {

    }

    @Override
    public void deleteLectureSections(Long[] ids) {

    }

}
