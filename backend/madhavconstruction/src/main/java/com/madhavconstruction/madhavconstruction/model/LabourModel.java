package com.madhavconstruction.madhavconstruction.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "labours")
public class LabourModel {

    @Id
    private String id;

    private String slug; // e.g. "sameer-lokhand"
    private String publicId; // e.g. "a7f3d9x8y1z" (UUID/Hash)
    private String labourName;
    private String companyName;
    private int salary;
    private int borrow;

    private List<WorkData> workData;
    @CreatedDate
    private LocalDateTime createdAt; // will auto-populate when inserted

    public LabourModel(String id, String slug, String publicId, String labourName,
                       String companyName, int salary, int borrow, List<WorkData> workData,LocalDateTime createdAt) {
        this.id = id;
        this.slug = slug;
        this.publicId = publicId;
        this.labourName = labourName;
        this.companyName = companyName;
        this.salary = salary;
        this.borrow = borrow;
        this.workData = workData;
        this.createdAt = createdAt;
    }

    // Getters and setters...

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getLabourName() {
        return labourName;
    }

    public void setLabourName(String labourName) {
        this.labourName = labourName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getBorrow() {
        return borrow;
    }

    public void setBorrow(int borrow) {
        this.borrow = borrow;
    }

    public List<WorkData> getWorkData() {
        return workData;
    }

    public void setWorkData(List<WorkData> workData) {
        this.workData = workData;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
