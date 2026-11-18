-- =======================================================
-- Bakery Inventory Management System - Database Schema
-- Database: hackathon_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

DROP TABLE IF EXISTS inventory_transactions;
DROP TABLE IF EXISTS products;

-- -------------------------------------------------------
-- Products Table (Clean, Lightweight & Simple)
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
