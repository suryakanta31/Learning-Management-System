package com.example.lms.service;

import com.example.lms.entity.Admin;
import com.example.lms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin register(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin login(String email, String password) {
        return adminRepository.findByEmail(email)
                .filter(a -> a.getPassword().equals(password))
                .orElse(null);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}

