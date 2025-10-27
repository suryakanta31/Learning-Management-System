package com.example.lms.controller;

import com.example.lms.entity.Student;
import com.example.lms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // ----------------- Student Login -----------------
    @PostMapping("/login")
    public Student login(@RequestBody Student student) {
        Optional<Student> existing = studentRepository.findByEmail(student.getEmail());
        if(existing.isPresent() && existing.get().getPassword().equals(student.getPassword())) {
            return existing.get();
        }
        return null;
    }

    // ----------------- Get all students -----------------
    @GetMapping("/")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ----------------- Add new student -----------------
    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // ----------------- Update student -----------------
    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student existing = studentRepository.findById(id).orElseThrow();
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPassword(student.getPassword());
        existing.setBatch(student.getBatch());
        return studentRepository.save(existing);
    }

    // ----------------- Delete student -----------------
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
        return "Student deleted successfully";
    }
}
