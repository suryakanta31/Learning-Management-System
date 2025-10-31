package com.example.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // ✅ Disable CSRF for APIs
            .csrf(csrf -> csrf.disable())
            // ✅ Enable global CORS
            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth
                // ✅ Public routes (no token required)
                .requestMatchers(
                    "/api/auth/**",
                    "/api/admins/login",
                    "/api/trainers/login",
                    "/api/students/login",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()

                // ✅ Role-based routes
                .requestMatchers("/api/admin/**", "/api/course/**", "/api/student/**").hasAuthority("ADMIN")
                .requestMatchers("/api/trainer/**").hasAnyAuthority("TRAINER", "ADMIN")
                .requestMatchers("/api/student/**").hasAnyAuthority("STUDENT", "ADMIN")

                // ✅ Any other route requires authentication
                .anyRequest().authenticated()
            )

            // ✅ Stateless session (for JWT)
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // ✅ Add our JWT filter before Spring's built-in authentication
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ Password encoder for login (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ Authentication Manager for AuthController
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
