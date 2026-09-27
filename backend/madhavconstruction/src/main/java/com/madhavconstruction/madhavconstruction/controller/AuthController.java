package com.madhavconstruction.madhavconstruction.controller;

import com.madhavconstruction.madhavconstruction.model.Session;
import com.madhavconstruction.madhavconstruction.repository.SessionRepository;
import com.madhavconstruction.madhavconstruction.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/v2/api/auth")
public class AuthController {

    public AuthController(AuthService authService, SessionRepository sessionRepository) {
        this.authService = authService;
        this.sessionRepository = sessionRepository;
    }

    private final AuthService authService;
    private final SessionRepository sessionRepository;

    @Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${app.cookie.same-site:Lax}")
    private String cookieSameSite;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        boolean success = authService.register(username, password);
        return Map.of("status", success ? "registered" : "username-taken");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<Session> sessionOpt = authService.login(username, password);
        if (sessionOpt.isEmpty()) {
            return Map.of("status", "invalid-credentials");
        }

        Session session = sessionOpt.get();
        ResponseCookie cookie = ResponseCookie.from("SESSIONID", session.getToken())
            .httpOnly(true)
            .secure(cookieSecure)
            .path("/")
            .maxAge(3600)
            .sameSite(cookieSameSite)
            .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return Map.of("status", "logged-in");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "SESSIONID", required = false) String token,
                                    HttpServletResponse response) {
        if (token != null) {
            // Remove session from database
                sessionRepository.deleteByToken(token);

            // Clear cookie
            ResponseCookie deleteCookie = ResponseCookie.from("SESSIONID", "")
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(0) // 🔥 expires immediately
                    .sameSite(cookieSameSite)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        }

        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @GetMapping("/session")
    public ResponseEntity<?> checkSession(@CookieValue(value = "SESSIONID", required = false) String token) {
        System.out.println("SESSIONID cookie: " + token);
        return authService.getUserByToken(token)
                .map(user -> ResponseEntity.ok(Map.of("username", user.getUsername())))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@CookieValue(value = "SESSIONID", required = false) String token) {
        return authService.getUserByToken(token)
                .map(user -> ResponseEntity.ok(Map.of("message", "Welcome " + user.getUsername())))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }


}
