package com.madhavconstruction.madhavconstruction.model;


import java.util.ArrayList;
import java.util.List;

public class AbstractSection {

        private String id;
        private String title;
        private List<AbstractEntry> entries = new ArrayList<>();

        public AbstractSection() {}

        // getters & setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public List<AbstractEntry> getEntries() { return entries; }
        public void setEntries(List<AbstractEntry> entries) { this.entries = entries; }

        public AbstractSection(String id, String title, List<AbstractEntry> entries) {
                this.id = id;
                this.title = title;
                this.entries = entries;
        }
}


