package com.madhavconstruction.madhavconstruction.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@Document(collection = "labourworksheet")
public class LabourWorkModel {

        @Id
        private String id;
        private LocalDate date;
        private String company;
        private String labour;
        private String work;

    public LabourWorkModel(String id, LocalDate date, String company, String labour, String work) {
        this.id = id;
        this.date = date;
        this.company = company;
        this.labour = labour;
        this.work = work;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLabour() {
        return labour;
    }

    public void setLabour(String labour) {
        this.labour = labour;
    }

    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }
}