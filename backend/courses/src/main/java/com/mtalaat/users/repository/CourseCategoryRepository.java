package com.mtalaat.users.repository;

import com.mtalaat.users.entity.Course;
import com.mtalaat.users.entity.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Long> {
}
