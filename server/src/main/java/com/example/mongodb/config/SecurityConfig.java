package com.example.mongodb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/**", "/register").permitAll() // Allow unauthenticated access to login & registration
                        .anyRequest().authenticated() // Protect other endpoints
                )
                .formLogin(form -> form.loginProcessingUrl("/api/auth/login")
                        .permitAll()
                );
               // Allow basic authentication (optional)
        return http.build();
    }
}

