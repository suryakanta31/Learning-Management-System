package com.example.lms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "batches")
public class Batch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchName;
    private String startDate;
    private String endDate;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public Batch() {}

    public Batch(String batchName, String startDate, String endDate, Course course) {
        this.batchName = batchName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.course = course;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBatchName() { return batchName; }
    public void setBatchName(String batchName) { this.batchName = batchName; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
