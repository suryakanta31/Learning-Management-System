package com.example.lms.controller;

import com.example.lms.dto.JwtResponse;
import com.example.lms.dto.LoginRequest;
import com.example.lms.dto.SignupRequest;
import com.example.lms.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ------------------ ADMIN ------------------
    @PostMapping("/admin/signup")
    public ResponseEntity<JwtResponse> registerAdmin(@RequestBody SignupRequest signupRequest) {
        JwtResponse response = authService.registerAdmin(signupRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<JwtResponse> loginAdmin(@RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(loginRequest, "ADMIN");
        return ResponseEntity.ok(response);
    }

    // ------------------ TRAINER ------------------
    @PostMapping("/trainer/signup")
    public ResponseEntity<JwtResponse> registerTrainer(@RequestBody SignupRequest signupRequest) {
        JwtResponse response = authService.registerTrainer(signupRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/trainer/login")
    public ResponseEntity<JwtResponse> loginTrainer(@RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(loginRequest, "TRAINER");
        return ResponseEntity.ok(response);
    }

    // ------------------ STUDENT ------------------
    @PostMapping("/student/signup")
    public ResponseEntity<JwtResponse> registerStudent(@RequestBody SignupRequest signupRequest) {
        JwtResponse response = authService.registerStudent(signupRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/student/login")
    public ResponseEntity<JwtResponse> loginStudent(@RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(loginRequest, "STUDENT");
        return ResponseEntity.ok(response);
    }
}
