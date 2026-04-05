package com.mtalaat.users.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {

        Collection<GrantedAuthority> roles = new ArrayList<>();

        // Realm roles
        Map<String, Object> realmAccess =
                (Map<String, Object>) source.getClaims().get("realm_access");

        if (realmAccess != null) {
            List<String> realmRoles = (List<String>) realmAccess.get("roles");
            if (realmRoles != null) {
                roles.addAll(realmRoles.stream()
                        .map(role -> "ROLE_" + role)
                        .map(SimpleGrantedAuthority::new)
                        .toList());
            }
        }

        // Client roles
        Map<String, Object> resourceAccess =
                (Map<String, Object>) source.getClaims().get("resource_access");

        if (resourceAccess != null) {
            Map<String, Object> client =
                    (Map<String, Object>) resourceAccess.get("elearning-web-app");

            if (client != null) {
                List<String> clientRoles = (List<String>) client.get("roles");
                if (clientRoles != null) {
                    roles.addAll(clientRoles.stream()
                            .map(role -> "ROLE_" + role)
                            .map(SimpleGrantedAuthority::new)
                            .toList());
                }
            }
        }

        return roles;
    }
}