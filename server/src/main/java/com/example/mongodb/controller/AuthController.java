package com.example.mongodb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    // Login endpoint: With session-based auth, Spring Security manages login automatically
    @GetMapping("/api/auth/login-success") // In case you want success feedback.
    public ResponseEntity<String> loginSuccess(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok("Login successful for user: " + authentication.getName());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }

    // Logout success endpoint (optional)
    @GetMapping("/api/auth/logout-success")
    public ResponseEntity<String> logoutSuccess() {
        return ResponseEntity.ok("Logout successful");
    }
}