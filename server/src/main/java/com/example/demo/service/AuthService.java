package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.*;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // Constructor injection (replaces @RequiredArgsConstructor)
    public AuthService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder,
                      AuthenticationManager authenticationManager, 
                      JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public String register(RegisterRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
        
        // Check password confirmation if provided
        if (request.getConfirmPassword() != null && 
            !request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email");
        }

        // Create and save user
        User user = new User(
            request.getEmail().toLowerCase().trim(),
            passwordEncoder.encode(request.getPassword()),
            Role.USER
        );

        userRepository.save(user);
        return "User registered successfully";
    }
    public String registerAdmin(RegisterRequest request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("User already exists");
    }

    User admin = new User();
    admin.setEmail(request.getEmail());
    admin.setPassword(passwordEncoder.encode(request.getPassword()));
    admin.setRole(Role.ADMIN);  

    userRepository.save(admin);
    return "Admin registered successfully";
    }


    public AuthResponse login(LoginRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        try {
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

            // Generate token
            String token = jwtUtil.generateToken(user.getEmail(), List.of("ROLE_" + user.getRole().name()));
            
            return new AuthResponse(token, "Login successful");
                        
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid email or password");
        } catch (DisabledException e) {
            throw new IllegalArgumentException("Account is disabled");
        } catch (LockedException e) {
            throw new IllegalArgumentException("Account is locked");
        }
    }
}