package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.Bills;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillRepository extends MongoRepository<Bills, String> {

    // Add Pageable as second parameter
    Page<Bills> findByCompanyNameContainingIgnoreCase(String companyName, Pageable pageable);
}
