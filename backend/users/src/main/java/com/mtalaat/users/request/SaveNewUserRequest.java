package com.mtalaat.users.request;

import lombok.Data;

@Data
public class SaveNewUserRequest {

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private String profilePicture;


}
