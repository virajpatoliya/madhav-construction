package com.madhavconstruction.madhavconstruction.service;

import com.madhavconstruction.madhavconstruction.model.MainBill;
import com.madhavconstruction.madhavconstruction.repository.MainBillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MainBillService {

    private final MainBillRepository repository;

    public MainBillService(MainBillRepository repository) {
        this.repository = repository;
    }

    public Page<MainBill> getAll(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public Optional<MainBill> getById(String id) {
        return repository.findById(id);
    }

    // Create new bill
    public MainBill create(MainBill bill) {
        if (bill.getBillNo() != null && repository.existsByBillNo(bill.getBillNo())) {
            throw new RuntimeException("Bill No already exists");
        }
        return repository.save(bill);
    }

    // Update existing bill
    public MainBill update(String id, MainBill updated) {
        return repository.findById(id).map(existing -> {
            if (updated.getBillNo() != null && repository.existsByBillNoAndIdNot(updated.getBillNo(), id)) {
                throw new RuntimeException("Bill No already exists");
            }
            updated.setId(existing.getId());
            return repository.save(updated);
        }).orElseThrow(() -> new RuntimeException("Bill not found"));
    }



    public void delete(String id) {
        repository.deleteById(id);
    }

    public Page<MainBill> search(String keyword, int page, int size) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return repository.findAll(PageRequest.of(page, size));
        }
        return repository.searchByKeyword(keyword.trim(), PageRequest.of(page, size));
    }
}

