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
                    "Freshly baked white bread (400g)"
            ));

            productService.createProduct(new Product(
                    "Ladi Pav (6 Pack)",
                    "BAKE-PAV-002",
                    "Breads",
                    25.00,
                    10,
                    "Soft and fluffy bakery ladi pav"
            ));

            productService.createProduct(new Product(
                    "Chocolate Truffle Cake",
                    "BAKE-CAK-003",
                    "Cakes",
                    350.00,
                    10,
                    "Rich Dutch chocolate pastry cake (500g)"
            ));

            productService.createProduct(new Product(
                    "Butter Biscuits (Cookies)",
                    "BAKE-BIS-004",
                    "Biscuits",
                    60.00,
                    10,
                    "Crispy handmade bakery butter cookies"
            ));

            productService.createProduct(new Product(
                    "Vanilla Cream Roll",
                    "BAKE-CRM-005",
                    "Confectionery",
                    20.00,
                    10,
                    "Crispy puff pastry filled with cream"
            ));
        }
    }
}
