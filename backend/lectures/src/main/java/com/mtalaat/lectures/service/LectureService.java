package com.mtalaat.lectures.service;

import com.mtalaat.lectures.dto.LectureDto;
import com.mtalaat.lectures.dto.SaveLectureRequest;
import com.mtalaat.lectures.entity.Lecture;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LectureService {

    public LectureDto saveLecture(SaveLectureRequest request, String correlationId);
    public List<LectureDto> findAllLecturesByCourseId(String correlationId, Long courseId);
    public Lecture findLectureById(Long id);
    public Lecture updateLecture(Lecture lecture);
    public void deleteLecture(Long id);
    public void deleteLectures(List<Long> id);

}
