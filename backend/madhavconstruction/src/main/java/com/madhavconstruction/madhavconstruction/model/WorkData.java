package com.madhavconstruction.madhavconstruction.model;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.UUID;

public class WorkData {
    @Field("id")
    private String id;
    private String date;
    private int borrow=0;
    private String companyName;
    private String discription;
    private String workDay;
    private Integer extraMoney=0;

    public WorkData() {
        this.id = UUID.randomUUID().toString(); // default ID if none
    }

    public WorkData(String date, int borrow, String companyName, String discription, String workDay, Integer extraMoney) {
        this.id = UUID.randomUUID().toString();
        this.date = date;
        this.borrow = borrow;
        this.companyName = companyName;
        this.discription = discription;
        this.workDay = workDay;
        this.extraMoney = extraMoney;
    }

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) {
        // only set if not null, to avoid overwriting valid IDs
        if (id == null || id.isEmpty()) {
            this.id = UUID.randomUUID().toString();
        } else {
            this.id = id;
        }
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public int getBorrow() { return borrow; }
    public void setBorrow(int borrow) { this.borrow = borrow; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getDiscription() { return discription; }
    public void setDiscription(String discription) { this.discription = discription; }

    public String getWorkDay() { return workDay; }
    public void setWorkDay(String workDay) { this.workDay = workDay; }

    public Integer getExtraMoney() { return extraMoney; }
    public void setExtraMoney(Integer extraMoney) { this.extraMoney = extraMoney; }
}
