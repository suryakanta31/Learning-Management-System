package com.example.lms.controller;

import com.example.lms.entity.Admin;
import com.example.lms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // --- Signup/Register ---
    @PostMapping("/signup")
    public Admin register(@RequestBody Admin admin) {
        return adminService.register(admin);
    }

    // --- Login ---
    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        Admin loggedInAdmin = adminService.login(admin.getEmail(), admin.getPassword());
        if (loggedInAdmin == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return loggedInAdmin;
    }

    // --- Get all admins (optional) ---
    @GetMapping("/")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }
}
