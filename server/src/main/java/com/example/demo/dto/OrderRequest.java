package com.example.demo.dto;

import java.util.List;

public class OrderRequest {
    private String userEmail;
    private double total;
    private List<OrderItemRequest> items;

    public OrderRequest() {}

    public OrderRequest(String userEmail, double total, List<OrderItemRequest> items) {
        this.userEmail = userEmail;
        this.total = total;
        this.items = items;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}
