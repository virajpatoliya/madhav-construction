package com.madhavconstruction.madhavconstruction.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Main bills")
public class MainBill {
    public MainBill(String id, String companyName,String billHeadingName, String panNo, String input1, String input2, String input3, String billNo, String date, List<Item> items, String amountWords, String input4) {
        this.id = id;
        this.companyName = companyName;
        this.input1 = input1;
        this.input2 = input2;
        this.input3 = input3;
        this.billNo = billNo;
        this.date = date;
        this.items = items;
        this.amountWords = amountWords;
        this.input4 = input4;
        this.billHeadingName = billHeadingName;
        this.panNo = panNo;
    }

    @Id
    private String id;
    private String companyName;
    private String billHeadingName;
    private String input1;
    private String input2;
    private String input3;

    private String panNo;
    private String billNo;
    private String date;
    private List<Item> items;
    private String amountWords;
    private String input4;


    public String getBillHeadingName() {
        return billHeadingName;
    }

    public void setBillHeadingName(String billHeadingName) {
        this.billHeadingName = billHeadingName;
    }

    public String getPanNo() {
        return panNo;
    }

    public void setPanNo(String panNo) {
        this.panNo = panNo;
    }


    // Getters & setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getInput1() { return input1; }
    public void setInput1(String input1) { this.input1 = input1; }

    public String getInput2() { return input2; }
    public void setInput2(String input2) { this.input2 = input2; }

    public String getInput3() { return input3; }
    public void setInput3(String input3) { this.input3 = input3; }

    public String getBillNo() { return billNo; }
    public void setBillNo(String billNo) { this.billNo = billNo; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    public String getAmountWords() { return amountWords; }
    public void setAmountWords(String amountWords) { this.amountWords = amountWords; }

    public String getInput4() { return input4; }
    public void setInput4(String input4) { this.input4 = input4; }

    // nested Item class
    public static class Item {
        private String description;
        private String size;
        private Double rate;
        private Double amount;

        public Item() {}

        public Item(String description, String size, Double rate, Double amount) {
            this.description = description;
            this.size = size;
            this.rate = rate;
            this.amount = amount;
        }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getSize() { return size; }
        public void setSize(String size) { this.size = size; }

        public Double getRate() { return rate; }
        public void setRate(Double rate) { this.rate = rate; }

        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }
    }
}
