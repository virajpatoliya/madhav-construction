package com.madhavconstruction.madhavconstruction.repository;

import java.util.List;
import java.util.Optional;

import com.madhavconstruction.madhavconstruction.model.LabourModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabourRepository extends MongoRepository<LabourModel, String> {
    Optional<LabourModel> findBySlugAndPublicId(String slug, String publicId);
    List<LabourModel> findByLabourNameContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(
            String labourName, String companyName
    );
}
