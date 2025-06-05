package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.*;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with this email");

        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) 
                .build();

        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        UserDetails userDetails = userRepository.findByEmail(request.getEmail())
                .map(u -> org.springframework.security.core.userdetails.User
                        .withUsername(u.getEmail())
                        .password(u.getPassword())
                        .roles(u.getRole().name())
                        .build())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthResponse(token);
    }
    
}
