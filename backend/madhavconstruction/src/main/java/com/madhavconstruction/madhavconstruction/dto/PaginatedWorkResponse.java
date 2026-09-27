package com.madhavconstruction.madhavconstruction.dto;

import java.util.List;

public class PaginatedWorkResponse {
    private LabourDTO labour;
    private long totalItems; // 👈 count of all workData
    private int currentPage;

    public LabourDTO getLabour() {
        return labour;
    }

    public void setLabour(LabourDTO labour) {
        this.labour = labour;
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

    private int totalPages;

    public PaginatedWorkResponse(LabourDTO labour, long totalItems, int currentPage, int totalPages) {
        this.labour = labour;
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }

    // Getters & setters
}
