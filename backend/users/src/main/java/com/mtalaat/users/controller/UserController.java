package com.mtalaat.users.controller;


import com.mtalaat.users.dto.InstructorDto;
import com.mtalaat.users.entity.AppUser;
import com.mtalaat.users.service.serviceImpl.AppUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api", produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

    @Autowired
    private AppUserServiceImpl userService;


  /*  @GetMapping
    public List<AppUser> findAllUsers() {
        return userService.findAllUsers();
    }*/


    @GetMapping
    public ResponseEntity<Object> getUsersKeycloak() {
        return ResponseEntity.ok().body(userService.getUsersKeycloak());
    }


    @GetMapping("/getUserById")
    public ResponseEntity<Object> getUserById(@RequestParam("id") Long id) {
        return ResponseEntity.ok().body(userService.findUserById(id));
    }


    @GetMapping("/getUsersByIds")
    public ResponseEntity<List<InstructorDto>> findUsersByIds(@RequestParam("ids") List<String> ids) {
        return userService.findUsersByIds(ids);
    }

    @PostMapping
    public AppUser saveUser(@RequestBody AppUser user) {
        return userService.saveUser(user);
    }




}
