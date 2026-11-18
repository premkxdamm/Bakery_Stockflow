-- =======================================================
-- Bakery Inventory Management System - Database Schema
-- Database: hackathon_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

-- Drop tables if you want a clean restart (optional):
-- DROP TABLE IF EXISTS inventory_transactions;
-- DROP TABLE IF EXISTS products;

-- -------------------------------------------------------
-- Products Table (Capacity: up to 50+ bakery items)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL,
    min_stock_level INT NOT NULL DEFAULT 5,
    description VARCHAR(500),
    status VARCHAR(20) NOT NULL, -- IN_STOCK, LOW_STOCK, OUT_OF_STOCK
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- Inventory Transactions Table (Stock Audit Log)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    transaction_type VARCHAR(30) NOT NULL, -- STOCK_IN, STOCK_OUT, ADJUSTMENT, INITIAL_STOCK
    quantity_changed INT NOT NULL,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_product_id (product_id),
    INDEX idx_created_at (created_at)
);
