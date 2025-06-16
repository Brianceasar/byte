package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public ProductResponse create(ProductRequest request) {
        Product product = new Product(
            request.getName(),
            request.getDescription(),
            request.getPrice(),
            request.getStock()
        );
        Product saved = productRepo.save(product);
        return toResponse(saved);
    }

    public List<ProductResponse> getAll() {
        return productRepo.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getById(Long id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        return toResponse(product);
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        return toResponse(productRepo.save(product));
    }

    public void delete(Long id) {
        if (!productRepo.existsById(id)) {
            throw new ProductNotFoundException("Product not found");
        }
        productRepo.deleteById(id);
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock()
        );
    }
}
