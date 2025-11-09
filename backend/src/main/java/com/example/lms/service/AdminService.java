package com.example.lms.service;

import com.example.lms.entity.Admin;
import com.example.lms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // --- Register without hashing ---
    public Admin register(Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        // Password saved as plain text
        return adminRepository.save(admin);
    }

    // --- Login check without hashing ---
    public Admin login(String email, String password) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);
        if (optionalAdmin.isEmpty() || !optionalAdmin.get().getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }
        return optionalAdmin.get();
    }

    // --- Get all admins ---
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
