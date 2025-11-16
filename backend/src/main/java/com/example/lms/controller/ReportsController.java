package com.example.lms.controller;

import com.example.lms.entity.Batch;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportsController {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private BatchRepository batchRepository;

    /** ✅ 1️⃣ Trainer Workload with Subjects **/
    @GetMapping("/trainer-workload")
    public List<Map<String, Object>> getTrainerWorkload() {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            for (Trainer trainer : trainerRepository.findAll()) {
                Map<String, Object> map = new HashMap<>();
                map.put("trainerName", trainer.getName());
                map.put("trainerSubject", trainer.getSubject() != null ? trainer.getSubject() : "N/A");

                // Count batches handled by this trainer
                List<Batch> batches = batchRepository.findByTrainer_Id(trainer.getId());
                map.put("batchesHandled", batches != null ? batches.size() : 0);

                result.add(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    /** ✅ 2️⃣ Batch Summary **/
    @GetMapping("/batch-summary")
    public List<Map<String, Object>> getBatchSummary() {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            for (Batch batch : batchRepository.findAll()) {
                Map<String, Object> map = new HashMap<>();
                map.put("batchName", batch.getBatchName());
                map.put("startDate", batch.getStartDate());
                map.put("endDate", batch.getEndDate());

                // Trainer info
                map.put("trainerName", batch.getTrainer() != null ? batch.getTrainer().getName() : "N/A");
                map.put("trainerSubject", batch.getTrainer() != null ? batch.getTrainer().getSubject() : "N/A");

                result.add(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}
