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

    // ---------------------- SIGNUP ----------------------
    public JwtResponse registerAdmin(SignupRequest request) {
        return registerUser(request, "ADMIN");
    }

    public JwtResponse registerTrainer(SignupRequest request) {
        return registerUser(request, "TRAINER");
    }

    public JwtResponse registerStudent(SignupRequest request) {
        return registerUser(request, "STUDENT");
    }

    private JwtResponse registerUser(SignupRequest request, String role) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists. Please login instead.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ BCrypt encode
        user.setRole(role.toUpperCase());
        userRepository.save(user);

        // Immediately return JWT token
        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole());
        return new JwtResponse(token, user.getRole(), user.getEmail());
    }

    // ---------------------- LOGIN ----------------------
    public JwtResponse login(LoginRequest request, String role) {
        // ✅ Find user first
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password!"));

        // ✅ Check password manually (this avoids AuthenticationManager confusion)
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password!");
        }

        // ✅ Verify correct role
        if (user.getRole() == null || !user.getRole().equalsIgnoreCase(role)) {
            throw new RuntimeException("Access denied for this role!");
        }

        // ✅ Generate token
        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole());
        return new JwtResponse(token, user.getRole(), user.getEmail());
    }
}
