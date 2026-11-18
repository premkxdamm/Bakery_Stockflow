-- =======================================================
-- Bakery Inventory Management System - Simplified Schema
-- Database: hackathon_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

DROP TABLE IF EXISTS inventory_transactions;
DROP TABLE IF EXISTS products;

-- -------------------------------------------------------
-- 1. Products Table (Clean & Simple)
-- -------------------------------------------------------
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(255),
    status VARCHAR(20) NOT NULL, -- IN_STOCK, LOW_STOCK, OUT_OF_STOCK
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- 2. Inventory Transactions Table (Simplified Stock Audit)
-- -------------------------------------------------------
CREATE TABLE inventory_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity_changed INT NOT NULL,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
