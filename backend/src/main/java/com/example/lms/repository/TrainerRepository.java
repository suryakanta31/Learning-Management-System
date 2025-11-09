package com.example.lms.repository;

import com.example.lms.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    // 🔹 Find a trainer by email (used in login)
    Optional<Trainer> findByEmail(String email);

    // 🔹 Check if an email already exists (used in signup and addTrainer)
    boolean existsByEmail(String email);
}
