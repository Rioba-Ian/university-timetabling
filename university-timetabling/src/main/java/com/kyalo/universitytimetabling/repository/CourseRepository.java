package com.kyalo.universitytimetabling.repository;

import com.kyalo.universitytimetabling.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
