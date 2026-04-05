package com.mtalaat.lectures.repository;

import com.mtalaat.lectures.entity.Lecture;
import com.mtalaat.lectures.entity.LectureSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureSectionRepository extends JpaRepository<LectureSection, Long> {

    List<LectureSection> findByCourseId(Long courseId);
}
