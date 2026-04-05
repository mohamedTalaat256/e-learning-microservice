package com.mtalaat.users.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class InstructorDto {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String email;

}
