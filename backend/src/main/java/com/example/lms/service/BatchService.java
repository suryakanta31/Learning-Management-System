package com.example.lms.service;

import com.example.lms.entity.Batch;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    // =====================================
    // CREATE batch WITHOUT trainerId in URL
    // =====================================
    public Batch addBatch(Batch batch) {
        if (batch.getTrainer() != null && batch.getTrainer().getId() != null) {
            Long trainerId = batch.getTrainer().getId();
            Trainer trainer = trainerRepository.findById(trainerId)
                    .orElseThrow(() -> new RuntimeException("Trainer not found: " + trainerId));
            batch.setTrainer(trainer);
        }
        return batchRepository.save(batch);
    }

    // =====================================
    // CREATE batch WITH trainerId in URL
    // =====================================
    public Batch addBatch(Batch batch, Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found: " + trainerId));
        batch.setTrainer(trainer);
        return batchRepository.save(batch);
    }

    // ==========================
    // GET ALL BATCHES
    // ==========================
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    // ==========================
    // UPDATE batch
    // ==========================
    public Batch updateBatch(Long id, Batch updatedBatch) {
        Batch existing = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        if (updatedBatch.getBatchName() != null)
            existing.setBatchName(updatedBatch.getBatchName());

        if (updatedBatch.getSubjectName() != null)
            existing.setSubjectName(updatedBatch.getSubjectName());

        if (updatedBatch.getStartDate() != null)
            existing.setStartDate(updatedBatch.getStartDate());

        if (updatedBatch.getEndDate() != null)
            existing.setEndDate(updatedBatch.getEndDate());

        if (updatedBatch.getTrainer() != null && updatedBatch.getTrainer().getId() != null) {
            Trainer trainer = trainerRepository.findById(updatedBatch.getTrainer().getId())
                    .orElseThrow(() -> new RuntimeException("Trainer not found"));
            existing.setTrainer(trainer);
        }

        return batchRepository.save(existing);
    }

    // ==========================
    // DELETE batch
    // ==========================
    public void deleteBatch(Long id) {
        batchRepository.deleteById(id);
    }

    // ==========================
    // GET trainer-wise batches
    // ==========================
    public List<Batch> getBatchesByTrainer(Long trainerId) {
        trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        return batchRepository.findByTrainer_Id(trainerId);
    }

    public Batch getBatchById(Long id) {
    return batchRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Batch not found"));
}

}
