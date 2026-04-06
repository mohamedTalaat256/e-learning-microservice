package com.mtalaat.users.service.serviceImpl;

import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.AppUser;
import com.mtalaat.users.repository.AppUserRepository;
import com.mtalaat.users.request.SaveNewUserRequest;
import com.mtalaat.users.service.AppUserService;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;


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
    public UserRepresentation saveUsersKeycloak(SaveNewUserRequest request) {


        UserRepresentation newUser = new UserRepresentation();

        newUser.setEmail(request.getEmail());
        newUser.setUsername(request.getUsername());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEnabled(true);
        newUser.setEmailVerified(true);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(request.getPassword());
        credential.setTemporary(false);
        newUser.setCredentials(List.of(credential));

        newUser.setAttributes(Map.of("profilePicture", List.of(request.getProfilePicture())));

        RealmResource realmResource = keycloak.realm(realm);

        Response response = realmResource.users().create(newUser);
        if (response.getStatus() == 409) {
            throw new RuntimeException("Failed to create user: " + response.getStatus());
        }

        if (response.getStatus() != 201) {
            throw new RuntimeException("Failed to create user: " + response.getStatus());
        }

        String userId = CreatedResponseUtil.getCreatedId(response);

        UserResource userResource = realmResource.users().get(userId);

        userResource.roles()
                .realmLevel()
                .add(List.of(
                        realmResource.roles().get("STUDENT").toRepresentation()
                ));

        return userResource.toRepresentation();


    }
}
