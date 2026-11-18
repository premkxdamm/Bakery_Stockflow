package com.hackathon.backend.dto;

import java.util.List;

public class DashboardStats {

    private long totalProducts;
    private long totalStockUnits;
    private double totalInventoryValue;
    private long lowStockCount;
    private long outOfStockCount;
    private List<String> categories;

    public DashboardStats() {
    }

    public DashboardStats(long totalProducts, long totalStockUnits, double totalInventoryValue, long lowStockCount, long outOfStockCount, List<String> categories) {
        this.totalProducts = totalProducts;
        this.totalStockUnits = totalStockUnits;
        this.totalInventoryValue = totalInventoryValue;
        this.lowStockCount = lowStockCount;
        this.outOfStockCount = outOfStockCount;
        this.categories = categories;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalStockUnits() {
        return totalStockUnits;
    }

    public void setTotalStockUnits(long totalStockUnits) {
        this.totalStockUnits = totalStockUnits;
    }

    public double getTotalInventoryValue() {
        return totalInventoryValue;
    }

    public void setTotalInventoryValue(double totalInventoryValue) {
        this.totalInventoryValue = totalInventoryValue;
    }

    public long getLowStockCount() {
        return lowStockCount;
    }

    public void setLowStockCount(long lowStockCount) {
        this.lowStockCount = lowStockCount;
    }

    public long getOutOfStockCount() {
        return outOfStockCount;
    }

    public void setOutOfStockCount(long outOfStockCount) {
        this.outOfStockCount = outOfStockCount;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
