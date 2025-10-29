package com.example.lms.service;

import com.example.lms.dto.JwtResponse;
import com.example.lms.dto.LoginRequest;
import com.example.lms.dto.SignupRequest;
import com.example.lms.entity.User;
import com.example.lms.repository.UserRepository;
import com.example.lms.config.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ------------------ ADMIN SIGNUP ------------------
    public JwtResponse registerAdmin(SignupRequest request) {
        return registerUser(request, "ADMIN");
    }

    // ------------------ TRAINER SIGNUP ------------------
    public JwtResponse registerTrainer(SignupRequest request) {
        return registerUser(request, "TRAINER");
    }

    // ------------------ STUDENT SIGNUP ------------------
    public JwtResponse registerStudent(SignupRequest request) {
        return registerUser(request, "STUDENT");
    }

    // ✅ Common Signup Logic
    private JwtResponse registerUser(SignupRequest request, String role) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists. Please login instead.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role.toUpperCase()); // normalize role case
        userRepository.save(user);

        // Generate JWT token immediately after signup
        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole());
        return new JwtResponse(token, user.getRole(), user.getEmail());
    }

    // ✅ Login Logic (Common for all roles)
    public JwtResponse login(LoginRequest request, String role) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid email or password!");
        }

        Optional<User> optUser = userRepository.findByEmail(request.getEmail());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        User user = optUser.get();

        // Debug logs (optional)
        System.out.println("Requested Role: " + role);
        System.out.println("User Role in DB: " + user.getRole());

        // ✅ Ensure user role matches requested role
        if (user.getRole() == null || !user.getRole().equalsIgnoreCase(role)) {
            throw new RuntimeException("Access denied for this role!");
        }

        // Generate JWT token for authenticated user
        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole());
        return new JwtResponse(token, user.getRole(), user.getEmail());
    }
}

