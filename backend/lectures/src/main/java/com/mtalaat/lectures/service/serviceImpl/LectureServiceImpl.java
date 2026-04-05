package com.mtalaat.lectures.service.serviceImpl;

import com.mtalaat.lectures.dto.CourseDto;
import com.mtalaat.lectures.dto.SaveLectureRequest;
import com.mtalaat.lectures.mapper.LectureMapper;
import com.mtalaat.lectures.dto.LectureDto;
import com.mtalaat.lectures.entity.Lecture;
import com.mtalaat.lectures.repository.LectureRepository;
import com.mtalaat.lectures.service.LectureService;
import com.mtalaat.lectures.service.client.CourseFeignClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@Service
public class LectureServiceImpl implements LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private CourseFeignClient courseFeignClient;
    Logger LOG = LoggerFactory.getLogger(this.getClass());


    @Override
    public LectureDto saveLecture(SaveLectureRequest request, String correlationId) {



        Lecture lecture = lectureRepository.save(LectureMapper.requestToEntity(request));

        CourseDto courseDto = null;
        try {
            courseDto = courseFeignClient.getCourseById(correlationId, request.getCourseId()).getBody();
        } catch (Exception e) {
            LOG.error("Error fetching course details for courseId: {}{}", request.getCourseId(), e.getMessage());
        }

        return LectureMapper.toDto(lecture, courseDto);
    }

    @Override
    public List<LectureDto> findAllLecturesByCourseId(String correlationId, Long courseId) {
        List<Lecture> lecturesList = lectureRepository.findAllByCourseId(courseId);
        CourseDto courseDto = null;
        try {
            courseDto = courseFeignClient.getCourseById(correlationId, courseId).getBody();
        } catch (Exception e) {
            LOG.error("Error fetching course details for courseId: {}{}", courseId, e.getMessage());
        }

        CourseDto finalCourseDto = courseDto; // for lambda
        return lecturesList.stream()
                .map(lecture -> LectureMapper.toDto(lecture, finalCourseDto))
                .toList();
    }

    @Override
    public Lecture findLectureById(Long id) {
        return null;
    }

    @Override
    public Lecture updateLecture(Lecture lecture) {
        return null;
    }

    @Override
    public void deleteLecture(Long id) {
        Lecture lecture = lectureRepository.findById(id).orElseThrow();
        lectureRepository.delete(lecture);
    }


    @Override
    public void deleteLectures(List<Long> ids) {
        ids.forEach(lectureRepository::deleteById);
    }
}
