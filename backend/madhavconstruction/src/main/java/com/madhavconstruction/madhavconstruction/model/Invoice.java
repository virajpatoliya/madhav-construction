package com.madhavconstruction.madhavconstruction.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "invoices")
public class Invoice {

    @Id
    private String id;

    private String billNo;
    private String date;
    private String companyName;
    private String customerAddress;
    private String gstno;
    private String amountWords;
    private List<BillItem> items;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBillNo() {
        return billNo;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getGstno() {
        return gstno;
    }

    public void setGstno(String gstno) {
        this.gstno = gstno;
    }

    public String getAmountWords() {
        return amountWords;
    }

    public void setAmountWords(String amountWords) {
        this.amountWords = amountWords;
    }

    public List<BillItem> getItems() {
        return items;
    }

    public void setItems(List<BillItem> items) {
        this.items = items;
    }

    public Invoice(String id, String billNo, String date, String companyName, String customerAddress, String gstno, String amountWords, List<BillItem> items) {
        this.id = id;
        this.billNo = billNo;
        this.date = date;
        this.companyName = companyName;
        this.customerAddress = customerAddress;
        this.gstno = gstno;
        this.amountWords = amountWords;
        this.items = items;
    }

    // --- Inner Class for Table Rows ---
    public static class BillItem {
        private int srNo;
        private String description;
        private double amount;

        public BillItem(int srNo, String description, double amount) {
            this.srNo = srNo;
            this.description = description;
            this.amount = amount;
        }

        public int getSrNo() {
            return srNo;
        }

        public void setSrNo(int srNo) {
            this.srNo = srNo;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }
    }


}
