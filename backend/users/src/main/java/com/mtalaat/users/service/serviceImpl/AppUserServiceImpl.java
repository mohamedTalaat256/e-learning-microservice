package com.mtalaat.users.service.serviceImpl;

import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.AppUser;
import com.mtalaat.users.repository.AppUserRepository;
import com.mtalaat.users.service.AppUserService;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;


    @Override
    public void deleteUser(String AppUser) {

    }

    @Override
    public AppUser updateUser(AppUser user) {
        return null;
    }


    @Override
    public List<AppUser> findAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public ResponseEntity<List<InstructorDto>> findUsersByIds(List<String> ids) {
        return ResponseEntity.ok(appUserRepository.findUsersByIdIn(ids).stream().map(user -> {
            InstructorDto instructorDto = new InstructorDto();
            instructorDto.setId(user.getId());
            instructorDto.setUsername(user.getUsername());
            instructorDto.setFirstName(user.getFirstName());
            instructorDto.setLastName(user.getLastName());
            instructorDto.setEmail(user.getEmail());
            instructorDto.setProfilePicture(user.getProfilePicture());
            return instructorDto;
        }).toList());
    }

    @Override
    public InstructorDto findUserById(Long id) {

        AppUser user = appUserRepository.findById(id).orElseThrow();

            InstructorDto instructorDto = new InstructorDto();
            instructorDto.setId(user.getId());
            instructorDto.setUsername(user.getUsername());
            instructorDto.setFirstName(user.getFirstName());
            instructorDto.setLastName(user.getLastName());
            instructorDto.setEmail(user.getEmail());
            instructorDto.setProfilePicture(user.getProfilePicture());
            return instructorDto;
    }

    @Override
    public AppUser saveUser(AppUser user) {
        return appUserRepository.save(user);
    }


    @Override
    public List<UserRepresentation> getUsersKeycloak() {
        return keycloak.realm(realm).users().list();
    }

    @Override
    public UserRepresentation saveUsersKeycloak() {
        UserRepresentation newUser = new UserRepresentation();
        //return keycloak.realm(realm).users().create();
        return null;
    }
}
