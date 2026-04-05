package com.mtalaat.users.repository;

import com.mtalaat.users.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {


    List<AppUser> findUsersByIdIn(List<String> ids);
}
