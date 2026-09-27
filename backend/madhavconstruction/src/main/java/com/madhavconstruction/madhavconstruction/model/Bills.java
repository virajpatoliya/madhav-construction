package com.madhavconstruction.madhavconstruction.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "Measurementbills")
public class Bills {
    public Bills(String id, String companyName, String workName, LocalDate date, List<Section> sections) {
        this.id = id;
        this.companyName = companyName;
        this.workName = workName;
        this.date = date;
        this.sections = sections;
    }

    @Id
    private String id;
    private String companyName;   // e.g., Ganesh Glory
    private String workName;      // e.g., Slab Work
    private LocalDate date;       // user-changeable
    private List<Section> sections;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }


}
