package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.MaterialModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MaterialRepository extends MongoRepository<MaterialModel, String> {
    Page<MaterialModel> findByCompanyContainingIgnoreCase(String company, Pageable pageable);
    // Count all unique companies
    @Aggregation(pipeline = {
            "{ $group: { _id: '$company' } }",
            "{ $count: 'total' }"
    })
    Long countDistinctCompanies();

    @Aggregation(pipeline = {
            "{ $match: { company: { $regex: ?0, $options: 'i' } } }",
            "{ $group: { _id: '$company' } }",
            "{ $count: 'total' }"
    })
    Long countDistinctCompaniesByName(String company);

}

