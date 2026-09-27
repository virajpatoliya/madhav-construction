package com.madhavconstruction.madhavconstruction.service;

import com.madhavconstruction.madhavconstruction.model.Session;
import com.madhavconstruction.madhavconstruction.model.User;
import com.madhavconstruction.madhavconstruction.repository.SessionRepository;
import com.madhavconstruction.madhavconstruction.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    public AuthService(UserRepository userRepository, SessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    public boolean register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return false;
        }
        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(BCrypt.hashpw(password, BCrypt.gensalt()));
        userRepository.save(user);
        return true;
    }

    public Optional<Session> login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return Optional.empty();

        User user = userOpt.get();
        if (!BCrypt.checkpw(password, user.getPasswordHash())) {
            return Optional.empty();
        }

        // Invalidate previous session
        sessionRepository.deleteByUserId(user.getId());

        // Create new session
        Session session;
        session = new Session();
        session.setUserId(user.getId());
        session.setToken(UUID.randomUUID().toString());
        session.setCreatedAt(Instant.now());
        session.setExpiresAt(Instant.now().plusSeconds(3600)); // 1 hour

        return Optional.of(sessionRepository.save(session));
    }

    public void logout(String token) {
        sessionRepository.findByToken(token).ifPresent(session ->
                sessionRepository.deleteById(session.getId())
        );
    }

    public Optional<User> getUserByToken(String token) {
        return sessionRepository.findByToken(token)
                .flatMap(session -> userRepository.findById(session.getUserId()));
    }
}
