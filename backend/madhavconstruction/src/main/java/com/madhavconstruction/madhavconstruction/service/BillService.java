package com.madhavconstruction.madhavconstruction.service;

import com.madhavconstruction.madhavconstruction.dto.BillResponse;
import com.madhavconstruction.madhavconstruction.model.Bills;
import com.madhavconstruction.madhavconstruction.repository.BillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BillService {
    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }


    private BillRepository billRepository;

    public Bills addBill(Bills bill) {
        if (bill.getDate() == null) {
            bill.setDate(LocalDate.now());
        }
        return billRepository.save(bill);
    }

    public List<Bills> getAllBills() {
        return billRepository.findAll();
    }

    public Optional<Bills> getBillById(String id) {
        return billRepository.findById(id);
    }

    public BillResponse searchByCompany(String company, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Bills> paged;
        if (company == null || company.trim().isEmpty()) {
            paged = billRepository.findAll(pageable); // return all if no search
        } else {
            paged = billRepository.findByCompanyNameContainingIgnoreCase(company.trim(), pageable);
        }

        return new BillResponse(
                paged.getContent(),
                paged.getTotalElements(),
                paged.getNumber(),
                paged.getTotalPages()
        );
    }


    public Bills updateBill(String id, Bills updatedBill) {
        return billRepository.findById(id).map(existing -> {
            existing.setCompanyName(updatedBill.getCompanyName());
            existing.setWorkName(updatedBill.getWorkName());
            existing.setDate(updatedBill.getDate());
            existing.setSections(updatedBill.getSections());
            return billRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    public boolean deleteBill(String id) {
        if (billRepository.existsById(id)) {
            billRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
