package com.example.lms.controller;

import com.example.lms.entity.Batch;
import com.example.lms.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:5173")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping
    public Batch addBatch(@RequestBody Batch batch) {
        return batchService.addBatch(batch);
    }

    @GetMapping
    public List<Batch> getAllBatches() {
        return batchService.getAllBatches();
    }

    @PutMapping("/{id}")
    public Batch updateBatch(@PathVariable Long id, @RequestBody Batch batch) {
        return batchService.updateBatch(id, batch);
    }

    @DeleteMapping("/{id}")
    public void deleteBatch(@PathVariable Long id) {
        batchService.deleteBatch(id);
    }

    @GetMapping("/trainer/{trainerId}")
    public List<Batch> getBatchesByTrainer(@PathVariable Long trainerId) {
        return batchService.getBatchesByTrainer(trainerId);
    }
}
