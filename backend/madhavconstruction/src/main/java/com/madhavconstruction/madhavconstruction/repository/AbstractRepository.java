package com.madhavconstruction.madhavconstruction.repository;

import com.madhavconstruction.madhavconstruction.model.AbstractModel;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

 @Repository
    public interface AbstractRepository extends MongoRepository<AbstractModel, String> {
      Page<AbstractModel> findByCompanyNameContainingIgnoreCaseOrWorkNameContainingIgnoreCase(
             String companyName, String workName, Pageable pageable
     );
    }


