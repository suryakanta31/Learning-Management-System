package com.example.lms.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class JwtResponse {
    private String token;
    private String role;
    private String email;
}
