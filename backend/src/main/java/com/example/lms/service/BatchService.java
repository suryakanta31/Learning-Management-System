package com.example.lms.service;

import com.example.lms.entity.Batch;
import com.example.lms.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    public Batch addBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch updateBatch(Long id, Batch updatedBatch) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found with ID: " + id));
        batch.setBatchName(updatedBatch.getBatchName());
        batch.setStartDate(updatedBatch.getStartDate());
        batch.setEndDate(updatedBatch.getEndDate());
        batch.setCourse(updatedBatch.getCourse());
        return batchRepository.save(batch);
    }

    public void deleteBatch(Long id) {
        if (!batchRepository.existsById(id)) {
            throw new RuntimeException("Batch not found with ID: " + id);
        }
        batchRepository.deleteById(id);
    }
}