package com.madhavconstruction.madhavconstruction.controller;

import com.madhavconstruction.madhavconstruction.dto.BillResponse;
import com.madhavconstruction.madhavconstruction.model.Bills;
import com.madhavconstruction.madhavconstruction.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/v2/api/bills")
public class BillController {
    @Autowired
    private BillService billService;

    @PostMapping
    public Bills addBill(@RequestBody Bills bill) {
        return billService.addBill(bill);
    }

    @GetMapping
    public List<Bills> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    public Bills getBillById(@PathVariable String id) {
        return billService.getBillById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    // BillsController.java
    @GetMapping("/search")
    public BillResponse searchBills(
            @RequestParam String company,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return billService.searchByCompany(company, page, size);
    }


    @PutMapping("/{id}")
    public Bills updateBill(@PathVariable String id, @RequestBody Bills bill) {
        return billService.updateBill(id, bill);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable String id) {
        if (!billService.deleteBill(id)) {
            throw new RuntimeException("Bill not found");
        }
    }
}
