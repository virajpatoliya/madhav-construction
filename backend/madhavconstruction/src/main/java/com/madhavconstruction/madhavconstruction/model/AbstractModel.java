package com.madhavconstruction.madhavconstruction.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "abstractbills")
public class AbstractModel {

        @Id
        private String id;
        private String companyName;
        private String workName;
        private String date;
        private String billNo;
        private List<AbstractSection> abstractSection = new ArrayList<>();
        // optional: totals cached

        public AbstractModel() {}



        // getters & setters (generate)
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getWorkName() { return workName; }
        public void setWorkName(String workName) { this.workName = workName; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getBillNo() { return billNo; }
        public void setBillNo(String billNo) { this.billNo = billNo; }
        public List<AbstractSection> getAbstractSection() { return abstractSection; }
        public void setAbstractSection(List<AbstractSection> abstractSection) { this.abstractSection = abstractSection; }


        public AbstractModel(String id, String companyName, String workName, String date, String billNo, List<AbstractSection> abstractSection) {
                this.id = id;
                this.companyName = companyName;
                this.workName = workName;
                this.date = date;
                this.billNo = billNo;
                this.abstractSection = abstractSection;

        }
}
