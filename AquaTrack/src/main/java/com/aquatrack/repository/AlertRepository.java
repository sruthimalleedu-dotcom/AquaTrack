package com.aquatrack.repository;

import com.aquatrack.entity.Alert;
import com.aquatrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findByUser(User user); //Get all alerts of a user

    List<Alert> findByUserOrderByCreatedAtDesc(User user); //Latest alerts first

    List<Alert> findByUserAndIsReadFalse(User user); //Unread alerts

    long countByUserAndIsReadFalse(User user); //Notification badge count
}