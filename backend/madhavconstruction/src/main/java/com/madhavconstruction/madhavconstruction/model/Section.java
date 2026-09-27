package com.madhavconstruction.madhavconstruction.model;

import lombok.Data;

import java.util.List;

@Data
public class Section {
    public Section(String id, String title, List<Entry> entries) {
        this.id = id;
        this.title = title;
        this.entries = entries;
    }

    private String id;
    private String title;
    private List<Entry> entries;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }


}
