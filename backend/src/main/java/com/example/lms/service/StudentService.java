package com.example.lms.service;

import com.example.lms.entity.Student;
import com.example.lms.repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepo;

    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    // ✅ Create new student
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    // ✅ Get all students
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    // ✅ Get one student by ID
    public Optional<Student> findById(Long id) {
        return studentRepo.findById(id);
    }

    // ✅ Update student details (no course now)
    public Student updateStudent(Long id, Student updated) {
        return studentRepo.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setEmail(updated.getEmail());
                    existing.setPhone(updated.getPhone());
                    return studentRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    // ✅ Delete student
    public void deleteStudent(Long id) {
        if (!studentRepo.existsById(id)) {
            throw new RuntimeException("Student not found with id " + id);
        }
        studentRepo.deleteById(id);
    }
}
