package com.example.lms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "trainers")
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @Column(name = "subject", nullable = false)
    private String subject; // Trainer subject (mandatory)

    private String experience;
    private String qualification;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
