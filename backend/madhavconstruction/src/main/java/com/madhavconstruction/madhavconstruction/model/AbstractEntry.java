package com.madhavconstruction.madhavconstruction.model;



import org.springframework.data.annotation.Id;
public class AbstractEntry {

        private String id;
        private String item;
        private Integer nos;
        private Double rate;
        private String perUnit;
        private Double amount;

        public AbstractEntry() {}

        // getters & setters
        // convenience: compute amount on setter or let client set amount
        // (for brevity, generate with IDE or Lombok)
        // ... getters and setters below ...

        public AbstractEntry(String id, String item, Integer nos, Double rate, String perUnit, Double amount) {
                this.id = id;
                this.item = item;
                this.nos = nos;
                this.rate = rate;
                this.perUnit = perUnit;
                this.amount = amount;
        }
        public String getId() { return id; }

        public void setId(String id) { this.id = id; }
        public String getItem() { return item; }
        public void setItem(String item) { this.item = item; }
        public Integer getNos() { return nos; }
        public void setNos(Integer nos) { this.nos = nos; }
        public Double getRate() { return rate; }
        public void setRate(Double rate) { this.rate = rate; }
        public String getPerUnit() { return perUnit; }
        public void setPerUnit(String perUnit) { this.perUnit = perUnit; }
        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }


}
