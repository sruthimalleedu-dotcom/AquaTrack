package com.aquatrack_backend.repository;

// Import the User entity
import com.aquatrack_backend.entity.User;

// Import JpaRepository to get built-in CRUD methods
import org.springframework.data.jpa.repository.JpaRepository;

// Optional is used because a user may or may not exist
import java.util.Optional;

// Repository interface for User table
public interface UserRepository extends JpaRepository<User, Long> {

    // Finds a user by username
    // Spring automatically creates the SQL query:
    // SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);

    // Returns true if the username already exists
    // Used during registration to prevent duplicate usernames
    boolean existsByUsername(String username);
}