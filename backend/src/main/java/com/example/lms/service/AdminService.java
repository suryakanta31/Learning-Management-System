package com.example.lms.service;

import com.example.lms.dto.CreateStudentDto;
import com.example.lms.entity.Student;
import com.example.lms.entity.Trainer;
import com.example.lms.entity.Admin;
import com.example.lms.entity.User;
import com.example.lms.entity.Course;
import com.example.lms.repository.StudentRepository;
import com.example.lms.repository.TrainerRepository;
import com.example.lms.repository.AdminRepository;
import com.example.lms.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final StudentRepository studentRepo;
    private final TrainerRepository trainerRepo;
    private final AdminRepository adminRepo;
    private final CourseRepository courseRepo;
    private final AuthService authService;

    public AdminService(StudentRepository studentRepo,
                        TrainerRepository trainerRepo,
                        AdminRepository adminRepo,
                        CourseRepository courseRepo,
                        AuthService authService) {
        this.studentRepo = studentRepo;
        this.trainerRepo = trainerRepo;
        this.adminRepo = adminRepo;
        this.courseRepo = courseRepo;
        this.authService = authService;
    }

    // Students
    public Student addStudent(CreateStudentDto dto) {
        User user = authService.createUserIfNotExists(dto.getEmail(), dto.getPassword(), "STUDENT");
        Student s = new Student();
        s.setName(dto.getName());
        s.setEmail(dto.getEmail());
        s.setPhone(dto.getPhone());
        s.setUser(user);
        return studentRepo.save(s);
    }

    public List<Student> listStudents() {
        return studentRepo.findAll();
    }

    // Trainers
    public Trainer addTrainer(Trainer trainer, String rawPassword) {
        User user = authService.createUserIfNotExists(trainer.getEmail(), rawPassword, "TRAINER");
        trainer.setUser(user);
        return trainerRepo.save(trainer);
    }

    public List<Trainer> listTrainers() {
        return trainerRepo.findAll();
    }

    // Courses
    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }

    public List<Course> listCourses() {
        return courseRepo.findAll();
    }
}
