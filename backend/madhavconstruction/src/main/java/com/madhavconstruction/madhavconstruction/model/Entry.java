package com.madhavconstruction.madhavconstruction.model;

import lombok.Data;

@Data
public class Entry {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public int getNos() {
        return nos;
    }

    public void setNos(int nos) {
        this.nos = nos;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getBreadth() {
        return breadth;
    }

    public void setBreadth(double breadth) {
        this.breadth = breadth;
    }

    public double getDepth() {
        return depth;
    }

    public void setDepth(double depth) {
        this.depth = depth;
    }

    public Entry(String id, String item, int nos, double length, double breadth, double depth) {
        this.id = id;
        this.item = item;
        this.nos = nos;
        this.length = length;
        this.breadth = breadth;
        this.depth = depth;
    }

    private String id;
    private String item;
    private int nos;
    private double length;
    private double breadth;
    private double depth;
}
