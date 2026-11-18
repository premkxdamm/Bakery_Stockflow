package com.hackathon.backend.service;

import com.hackathon.backend.dto.DashboardStats;
import com.hackathon.backend.dto.StockUpdateRequest;
import com.hackathon.backend.model.InventoryTransaction;
import com.hackathon.backend.model.Product;
import com.hackathon.backend.repository.InventoryTransactionRepository;
import com.hackathon.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryTransactionRepository transactionRepository;

    public ProductService(ProductRepository productRepository, InventoryTransactionRepository transactionRepository) {
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Product> getAllProducts(String search, String category, String status) {
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String cleanCategory = (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL")) ? category.trim() : null;
        String cleanStatus = (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) ? status.trim().toUpperCase() : null;

        return productRepository.searchAndFilter(cleanSearch, cleanCategory, cleanStatus);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Transactional
    public Product createProduct(Product product) {
        if (productRepository.existsBySku(product.getSku())) {
            throw new IllegalArgumentException("SKU already exists: " + product.getSku());
        }
        product.updateStatus();
        Product saved = productRepository.save(product);

        // Record initial stock transaction
        InventoryTransaction tx = new InventoryTransaction(
                saved.getId(),
                saved.getName(),
                "INITIAL_STOCK",
                saved.getQuantity(),
                0,
                saved.getQuantity(),
                "Initial catalog addition"
        );
        transactionRepository.save(tx);

        return saved;
    }

    @Transactional
    public Product updateProduct(Long id, Product details) {
        Product existing = getProductById(id);

        if (productRepository.existsBySkuAndIdNot(details.getSku(), id)) {
            throw new IllegalArgumentException("Another product already uses SKU: " + details.getSku());
        }

        existing.setName(details.getName());
        existing.setSku(details.getSku());
        existing.setCategory(details.getCategory());
        existing.setPrice(details.getPrice());
        existing.setMinStockLevel(details.getMinStockLevel());
        existing.setDescription(details.getDescription());

        if (!existing.getQuantity().equals(details.getQuantity())) {
            int previousQty = existing.getQuantity();
            int newQty = details.getQuantity();
            existing.setQuantity(newQty);

            InventoryTransaction tx = new InventoryTransaction(
                    existing.getId(),
                    existing.getName(),
                    "MANUAL_ADJUSTMENT",
                    newQty - previousQty,
                    previousQty,
                    newQty,
                    "Product edit update"
            );
            transactionRepository.save(tx);
        }

        existing.updateStatus();
        return productRepository.save(existing);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }

    @Transactional
    public Product adjustStock(Long id, StockUpdateRequest request) {
        Product product = getProductById(id);
        int change = (request.getQuantityChanged() != null) ? request.getQuantityChanged() : 0;
        int previousQty = product.getQuantity();
        int newQty = previousQty + change;

        if (newQty < 0) {
            throw new IllegalArgumentException("Cannot reduce stock below 0. Current shelf stock is " + previousQty);
        }

        product.setQuantity(newQty);
        product.updateStatus();
        Product saved = productRepository.save(product);

        String type = (change > 0) ? "STOCK_IN" : "STOCK_OUT";
        String reason = (request.getReason() != null && !request.getReason().trim().isEmpty())
                ? request.getReason().trim()
                : (change > 0 ? "Fresh batch baking replenishment" : "Customer order dispatch");

        InventoryTransaction tx = new InventoryTransaction(
                saved.getId(),
                saved.getName(),
                type,
                change,
                previousQty,
                newQty,
                reason
        );
        transactionRepository.save(tx);

        return saved;
    }

    public DashboardStats getDashboardStats() {
        List<Product> all = productRepository.findAll();
        long totalProducts = all.size();
        long totalStockUnits = all.stream().mapToLong(p -> p.getQuantity() != null ? p.getQuantity() : 0).sum();
        double totalValue = all.stream().mapToDouble(p -> (p.getPrice() != null ? p.getPrice() : 0) * (p.getQuantity() != null ? p.getQuantity() : 0)).sum();
        long lowStockCount = all.stream().filter(p -> "LOW_STOCK".equalsIgnoreCase(p.getStatus())).count();
        long outOfStockCount = all.stream().filter(p -> "OUT_OF_STOCK".equalsIgnoreCase(p.getStatus())).count();
        List<String> categories = productRepository.findDistinctCategories();

        return new DashboardStats(totalProducts, totalStockUnits, Math.round(totalValue * 100.0) / 100.0, lowStockCount, outOfStockCount, categories);
    }

    public List<String> getCategories() {
        return productRepository.findDistinctCategories();
    }
}
