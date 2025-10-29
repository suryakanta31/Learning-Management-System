package com.example.lms.service;

import com.example.lms.repository.StudentRepository;
import com.example.lms.entity.Student;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepo;

    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    public Optional<Student> findById(Long id) {
        return studentRepo.findById(id);
    }
}
