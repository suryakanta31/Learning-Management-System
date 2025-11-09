package com.example.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // ✅ Enable CORS using your CorsConfig
                .and()
                .csrf().disable() // ❌ Disable CSRF for APIs (not needed for JSON REST)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // ✅ Allow all endpoints (adjust later)
                );

        return http.build();
    }
}