package com.example.lms.controller;

import com.example.lms.entity.Admin;
import com.example.lms.entity.Student;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.AdminRepository;
import com.example.lms.repository.StudentRepository;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private StudentRepository studentRepository;

    // ---------------- Admin ----------------
    @PostMapping("/admin/login")
    public Map<String, String> adminLogin(@RequestBody Admin admin) {
        Optional<Admin> existing = adminRepository.findByEmail(admin.getEmail())
                .filter(a -> a.getPassword().equals(admin.getPassword()));
        Map<String, String> response = new HashMap<>();
        if (existing.isPresent()) {
            response.put("token", UUID.randomUUID().toString());
            response.put("message", "Login successful!");
        } else {
            response.put("message", "Invalid credentials!");
        }
        return response;
    }

    @PostMapping("/admin/signup")
    public Map<String, String> adminSignup(@RequestBody Admin admin) {
        adminRepository.save(admin);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin registered successfully!");
        return response;
    }

    // ---------------- Trainer ----------------
    @PostMapping("/trainer/login")
    public Map<String, String> trainerLogin(@RequestBody Trainer trainer) {
        Optional<Trainer> existing = trainerRepository.findByEmail(trainer.getEmail())
                .filter(t -> t.getPassword().equals(trainer.getPassword()));
        Map<String, String> response = new HashMap<>();
        if (existing.isPresent()) {
            response.put("token", UUID.randomUUID().toString());
            response.put("message", "Login successful!");
        } else {
            response.put("message", "Invalid credentials!");
        }
        return response;
    }

    @PostMapping("/trainer/signup")
    public Map<String, String> trainerSignup(@RequestBody Trainer trainer) {
        trainerRepository.save(trainer);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Trainer registered successfully!");
        return response;
    }

    // ---------------- Student ----------------
    @PostMapping("/student/login")
    public Map<String, String> studentLogin(@RequestBody Student student) {
        Optional<Student> existing = studentRepository.findByEmail(student.getEmail())
                .filter(s -> s.getPassword().equals(student.getPassword()));
        Map<String, String> response = new HashMap<>();
        if (existing.isPresent()) {
            response.put("token", UUID.randomUUID().toString());
            response.put("message", "Login successful!");
        } else {
            response.put("message", "Invalid credentials!");
        }
        return response;
    }

    @PostMapping("/student/signup")
    public Map<String, String> studentSignup(@RequestBody Student student) {
        studentRepository.save(student);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student registered successfully!");
        return response;
    }
}
