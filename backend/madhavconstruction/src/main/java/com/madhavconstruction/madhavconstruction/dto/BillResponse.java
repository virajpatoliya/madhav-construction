package com.madhavconstruction.madhavconstruction.dto;

import com.madhavconstruction.madhavconstruction.model.Bills;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class BillResponse {
    public List<Bills> getBills() {
        return bills;
    }

    public void setBills(List<Bills> bills) {
        this.bills = bills;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public BillResponse(List<Bills> bills, long totalItems, int currentPage, int totalPages) {
        this.bills = bills;
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }

    private List<Bills> bills;
    private long totalItems;
    private int currentPage;
    private int totalPages;
}
