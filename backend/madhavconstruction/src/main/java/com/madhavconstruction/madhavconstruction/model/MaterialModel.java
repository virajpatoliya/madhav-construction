package com.madhavconstruction.madhavconstruction.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
@Document(collection = "material")
public class MaterialModel {
    public MaterialModel(String id, LocalDate date, String company, String description, int number, int money) {
        this.id = id;
        this.date = date;
        this.company = company;
        this.description = description;
        this.number = number;
        this.money = money;
    }

    @Id
    private String id;
    private LocalDate date;
    private String company;
    private String description;
    private int number; // quantity of items
    private int money;  // cost per item or total amount
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

    public String getDescription() {
        return description;
    }

    public String setDescription(String description) {
        return this.description = description;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }


}