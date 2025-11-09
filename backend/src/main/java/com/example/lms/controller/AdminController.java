package com.example.lms.controller;

import com.example.lms.entity.Admin;
import com.example.lms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.register(admin);
            return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // --- Login ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        try {
            Admin loggedInAdmin = adminService.login(admin.getEmail(), admin.getPassword());
            return new ResponseEntity<>(loggedInAdmin, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    // --- Get all admins ---
    @GetMapping("/")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }
}
