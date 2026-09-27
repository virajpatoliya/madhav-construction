    package com.madhavconstruction.madhavconstruction.repository;

    import com.madhavconstruction.madhavconstruction.model.KharchaModel;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.mongodb.repository.Aggregation;
    import org.springframework.data.mongodb.repository.MongoRepository;

    import java.util.Optional;

    public interface KharchaRepository  extends MongoRepository<KharchaModel, String> {
        Page<KharchaModel> findByCompanyContainingIgnoreCase(String company, Pageable pageable);
        // Count all unique companies
        @Aggregation(pipeline = {
                "{ $group: { _id: '$company' } }",
                "{ $count: 'total' }"
        })
        Optional<Long> countDistinctCompanies();


        @Aggregation(pipeline = {
                "{ $match: { company: { $regex: ?0, $options: 'i' } } }",
                "{ $group: { _id: '$company' } }",
                "{ $count: 'total' }"
        })
        Optional<Long> countDistinctCompaniesByName(String company);

    }

