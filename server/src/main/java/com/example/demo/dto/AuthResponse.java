package com.example.demo.dto;

public class AuthResponse {
    private String token;
    private String message;

    // Default constructor
    public AuthResponse() {}

    // Constructor with token only
    public AuthResponse(String token) {
        this.token = token;
        this.message = "Success";
    }

    // Constructor with both fields
    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}