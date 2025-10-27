package com.example.lms.controller;

import com.example.lms.entity.Admin;
import com.example.lms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // your frontend port
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    // ----------------- Admin Login -----------------
    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        Optional<Admin> existing = adminRepository.findByEmail(admin.getEmail());
        if(existing.isPresent() && existing.get().getPassword().equals(admin.getPassword())) {
            return existing.get();
        }
        return null;
    }

    // ----------------- Get all admins -----------------
    @GetMapping("/")
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // ----------------- Add new admin -----------------
    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }

    // ----------------- Update admin -----------------
    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        Admin existing = adminRepository.findById(id).orElseThrow();
        existing.setName(admin.getName());
        existing.setEmail(admin.getEmail());
        existing.setPassword(admin.getPassword());
        return adminRepository.save(existing);
    }

    // ----------------- Delete admin -----------------
    @DeleteMapping("/delete/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        adminRepository.deleteById(id);
        return "Admin deleted successfully";
    }
}
