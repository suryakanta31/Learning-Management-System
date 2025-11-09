package com.example.lms.repository;

import com.example.lms.entity.Session;
import com.example.lms.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    // 🔹 Find sessions by trainer reference
    List<Session> findByTrainer(Trainer trainer);
}
