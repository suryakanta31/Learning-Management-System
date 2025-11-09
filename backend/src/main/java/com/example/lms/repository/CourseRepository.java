package com.example.lms.repository;

import com.example.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // 🔹 Find courses assigned to a specific trainer
    List<Course> findByTrainerId(Long trainerId);
}
