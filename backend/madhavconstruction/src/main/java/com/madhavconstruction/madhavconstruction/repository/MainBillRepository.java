package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.MainBill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface MainBillRepository extends MongoRepository<MainBill, String> {
    boolean existsByBillNo(String billNo);
    boolean existsByBillNoAndIdNot(String billNo, String id);

    // search by billNo or companyName (case-insensitive, partial)
    @Query("{ '$or': [ "
            + "{ 'billNo': { $regex: ?0, $options: 'i' } }, "
            + "{ 'companyName': { $regex: ?0, $options: 'i' } } "
            + "] }")
    Page<MainBill> searchByKeyword(String keyword, Pageable pageable);
}

