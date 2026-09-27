package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {

    boolean existsByBillNo(String billNo);

    // Paginated search
    @Query("{ '$or': [ "
            + "{ 'billNo': { $regex: ?0, $options: 'i' } }, "
            + "{ 'companyName': { $regex: ?0, $options: 'i' } } "
            + "] }")
    Page<Invoice> searchByKeyword(String keyword, Pageable pageable);
}
