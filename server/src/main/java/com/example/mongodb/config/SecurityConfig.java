package com.example.mongodb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.example.mongodb.service.AuthUserDetailsService;

@Configuration
public class SecurityConfig {

    // Define the Security Filter Chain for HTTP requests
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Explicitly disabling CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/register", "/api/auth/login", "/api/auth/logout").permitAll() // Publicly accessible endpoints
                        .anyRequest().authenticated() // Secure all other endpoints
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Set custom CORS configuration
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout") // Define logout endpoint
                        .invalidateHttpSession(true) // Invalidate session on logout
                        .deleteCookies("JSESSIONID") // Delete session cookies
                        .permitAll() // Allow everyone to access the logout endpoint
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Stateless sessions for APIs (JWT)

        return http.build(); // Build the HTTP security filter chain
    }

    // Configure CORS settings
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Allow frontend origin
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Allow sending of cookies/credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply it globally
        return source;
    }

    // Setup Password Encoder for securing passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for hashing passwords
    }

    // Configuring the AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder, AuthUserDetailsService userDetailsService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService); // Set the custom UserDetailsService
        authProvider.setPasswordEncoder(passwordEncoder); // Use BCrypt password encoder
        return authProvider::authenticate; // Return custom authentication logic using Lambda
    }
}