package com.madhavconstruction.madhavconstruction.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "mykharcha")
public class KharchaModel {
    public KharchaModel(String id, LocalDate date, String company, String description, int money) {
        this.id = id;
        this.date = date;
        this.company = company;
        this.description = description;
        this.money = money;
    }

    @Id
    private String id;

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

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    private LocalDate date;
    private String company;
    private String description;
    private int money; // expense amount
}

