package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.LabourWorkModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabourWorkRepository extends MongoRepository<LabourWorkModel, String> {

        Page<LabourWorkModel> findByCompanyContainingIgnoreCaseOrLabourContainingIgnoreCase(
                String company, String labour, Pageable pageable);

        Page<LabourWorkModel> findAll(Pageable pageable);
}
