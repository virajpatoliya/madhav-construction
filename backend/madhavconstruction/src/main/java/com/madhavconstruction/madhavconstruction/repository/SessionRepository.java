package com.madhavconstruction.madhavconstruction.repository;
import com.madhavconstruction.madhavconstruction.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SessionRepository extends MongoRepository<Session, String> {
    Optional<Session> findByToken(String token);
    Optional<Session> findByUserId(String userId);
    void deleteByUserId(String userId);

    void deleteByToken(String token);
}

