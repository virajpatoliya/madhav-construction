package com.madhavconstruction.madhavconstruction.dto;

import com.madhavconstruction.madhavconstruction.model.WorkData;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class LabourDTO {
    private String id;
    private String slug;
    private String publicId;
    private String labourName;
    private String companyName;
    private int salary;
    private int borrow; // calculated per month
    private int unpaid; // salary - borrow
    private int totalBorrow;

    public int getTotalBorrow() {
        return totalBorrow;
    }

    public void setTotalBorrow(int totalBorrow) {
        this.totalBorrow = totalBorrow;
    }


    @CreatedDate
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
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

    public int getUnpaid() {
        return unpaid;
    }

    public void setUnpaid(int unpaid) {
        this.unpaid = unpaid;
    }

    public List<WorkData> getWorkData() {
        return workData;
    }

    public void setWorkData(List<WorkData> workData) {
        this.workData = workData;
    }

    private List<WorkData> workData;

    public LabourDTO(String id, String slug, String publicId, String labourName, String companyName, int salary, int borrow, int unpaid,int totalBorrow, List<WorkData> workData,LocalDateTime createdAt) {
        this.id = id;
        this.slug = slug;
        this.publicId = publicId;
        this.labourName = labourName;
        this.companyName = companyName;
        this.salary = salary;
        this.borrow = borrow;
        this.unpaid = unpaid;
        this.totalBorrow=totalBorrow;
        this.workData = workData;
        this.createdAt = createdAt;
    }
}
