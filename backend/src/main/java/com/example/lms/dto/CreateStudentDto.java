package com.example.lms.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CreateStudentDto {
    private String name;
    private String email;
    private String phone;
    private String password;
}
