package com.mtalaat.users.service;

import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.AppUser;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AppUserService {

    public AppUser saveUser(AppUser user);
    public List<AppUser> findAllUsers();

    public ResponseEntity<List<InstructorDto>> findUsersByIds(List<String> ids);
    InstructorDto findUserById(Long id);

     public AppUser updateUser(AppUser user);
    public void deleteUser(String AppUser);


    public List<UserRepresentation> getUsersKeycloak();
    public UserRepresentation saveUsersKeycloak();

}
