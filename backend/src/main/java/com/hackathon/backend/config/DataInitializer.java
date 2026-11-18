package com.hackathon.backend.config;

import com.hackathon.backend.model.Product;
import com.hackathon.backend.repository.ProductRepository;
import com.hackathon.backend.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ProductService productService;

    public DataInitializer(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            // Seed the 5 core Bakery items (10 quantity each)
            productService.createProduct(new Product(
                    "Fresh Milk Bread",
                    "BAKE-BRD-001",
                    "Breads",
                    40.00,
                    10,
                    5,
                    "Soft and freshly baked white milk bread (400g pack)"
            ));

            productService.createProduct(new Product(
                    "Ladi Pav (6 Pack)",
                    "BAKE-PAV-002",
                    "Breads",
                    25.00,
                    10,
                    5,
                    "Traditional soft and fluffy bakery ladi pav"
            ));

            productService.createProduct(new Product(
                    "Chocolate Truffle Cake",
                    "BAKE-CAK-003",
                    "Cakes",
                    350.00,
                    10,
                    3,
                    "Rich Dutch chocolate pastry cake (500g)"
            ));

            productService.createProduct(new Product(
                    "Butter Biscuits (Cookies)",
                    "BAKE-BIS-004",
                    "Biscuits",
                    60.00,
                    10,
                    5,
                    "Crispy handmade bakery butter cookies (250g box)"
            ));

            productService.createProduct(new Product(
                    "Vanilla Cream Roll",
                    "BAKE-CRM-005",
                    "Confectionery",
                    20.00,
                    10,
                    4,
                    "Crispy puff pastry horn filled with fresh sweet cream"
            ));
        }
    }
}
