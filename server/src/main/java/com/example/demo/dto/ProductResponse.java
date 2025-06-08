package com.example.demo.dto;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int stock;

    // Constructors
    public ProductResponse(Long id, String name, String description, double price, int stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }
}
