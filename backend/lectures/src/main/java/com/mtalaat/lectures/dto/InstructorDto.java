package com.mtalaat.lectures.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstructorDto {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String email;

}
