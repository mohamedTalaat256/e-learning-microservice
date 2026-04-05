package com.mtalaat.lectures.controller;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/info")
    public Map<String, Object> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("authenticated", authentication.isAuthenticated());
        userInfo.put("name", authentication.getName());
        userInfo.put("authorities", authentication.getAuthorities());

        // Get JWT claims if available
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            userInfo.put("email", jwt.getClaimAsString("email"));
            userInfo.put("preferred_username", jwt.getClaimAsString("preferred_username"));
            userInfo.put("given_name", jwt.getClaimAsString("given_name"));
            userInfo.put("family_name", jwt.getClaimAsString("family_name"));
        }

        return userInfo;
    }

    @GetMapping("/roles")
    public Map<String, Object> getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> roles = new HashMap<>();
        roles.put("username", authentication.getName());
        roles.put("roles", authentication.getAuthorities());

        return roles;
    }
}