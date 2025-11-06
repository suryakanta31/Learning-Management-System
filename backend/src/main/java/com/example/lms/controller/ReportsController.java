package com.example.lms.controller;

import com.example.lms.entity.Batch;
import com.example.lms.entity.Course;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportsController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private BatchRepository batchRepository;

    /** ✅ 1️⃣ Course Performance **/
    @GetMapping("/course-performance")
    public List<Map<String, Object>> getCoursePerformance() {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Course course : courseRepository.findAll()) {
            Map<String, Object> map = new HashMap<>();
            map.put("courseName", course.getCourseName());
            map.put("duration", course.getDuration());
            int batchCount = batchRepository.findByCourse_Id(course.getId()).size();
            map.put("batchCount", batchCount);
            map.put("performance", batchCount * 20); // sample metric
            result.add(map);
        }

        return result;
    }

    /** ✅ 2️⃣ Trainer Workload **/
    @GetMapping("/trainer-workload")
    public List<Map<String, Object>> getTrainerWorkload() {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Trainer trainer : trainerRepository.findAll()) {
            Map<String, Object> map = new HashMap<>();
            map.put("trainerName", trainer.getName());
            map.put("email", trainer.getEmail());
            int batchesHandled = batchRepository.findByTrainer_Id(trainer.getId()).size();
            map.put("batchesHandled", batchesHandled);
            result.add(map);
        }

        return result;
    }

    /** ✅ 3️⃣ Batch Summary **/
    @GetMapping("/batch-summary")
    public List<Map<String, Object>> getBatchSummary() {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Batch batch : batchRepository.findAll()) {
            Map<String, Object> map = new HashMap<>();
            map.put("batchName", batch.getBatchName());
            map.put("startDate", batch.getStartDate());
            map.put("endDate", batch.getEndDate());
            map.put("courseName", batch.getCourse() != null ? batch.getCourse().getCourseName() : "N/A");
            map.put("trainerName", batch.getTrainer() != null ? batch.getTrainer().getName() : "N/A");
            result.add(map);
        }

        return result;
    }
}
