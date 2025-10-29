package com.example.lms.controller;

import com.example.lms.dto.CreateStudentDto;
import com.example.lms.entity.Student;
import com.example.lms.entity.Trainer;
import com.example.lms.entity.Course;
import com.example.lms.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) { this.adminService = adminService; }

    // Students
    @PostMapping("/students")
    public ResponseEntity<Student> addStudent(@RequestBody CreateStudentDto dto) {
        Student s = adminService.addStudent(dto);
        return ResponseEntity.ok(s);
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(adminService.listStudents());
    }

    // Trainers
    @PostMapping("/trainers")
    public ResponseEntity<Trainer> addTrainer(@RequestBody Trainer trainer, @RequestParam String password) {
        Trainer t = adminService.addTrainer(trainer, password);
        return ResponseEntity.ok(t);
    }

    @GetMapping("/trainers")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(adminService.listTrainers());
    }

    // Courses
    @PostMapping("/courses")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(adminService.addCourse(course));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses() {
        return ResponseEntity.ok(adminService.listCourses());
    }
}

