-- =======================================================
-- Bakery Inventory Management System - Initial 5 Products
-- Each item has an initial quantity of 10
-- =======================================================

USE hackathon_db;

-- Insert 5 Core Bakery Products (Quantity: 10 each)
INSERT INTO products (name, sku, category, price, quantity, min_stock_level, description, status) VALUES
('Fresh Milk Bread', 'BAKE-BRD-001', 'Breads', 40.00, 10, 5, 'Soft and freshly baked white milk bread (400g pack)', 'IN_STOCK'),
('Ladi Pav (6 Pack)', 'BAKE-PAV-002', 'Breads', 25.00, 10, 5, 'Traditional soft and fluffy bakery ladi pav', 'IN_STOCK'),
('Chocolate Truffle Cake', 'BAKE-CAK-003', 'Cakes', 350.00, 10, 3, 'Rich Dutch chocolate pastry cake (500g)', 'IN_STOCK'),
('Butter Biscuits (Cookies)', 'BAKE-BIS-004', 'Biscuits', 60.00, 10, 5, 'Crispy handmade bakery butter cookies (250g box)', 'IN_STOCK'),
('Vanilla Cream Roll', 'BAKE-CRM-005', 'Confectionery', 20.00, 10, 4, 'Crispy puff pastry horn filled with fresh sweet cream', 'IN_STOCK')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Record Initial Stock Transactions
INSERT INTO inventory_transactions (product_id, product_name, transaction_type, quantity_changed, previous_quantity, new_quantity, reason) VALUES
(1, 'Fresh Milk Bread', 'INITIAL_STOCK', 10, 0, 10, 'Morning fresh batch baking'),
(2, 'Ladi Pav (6 Pack)', 'INITIAL_STOCK', 10, 0, 10, 'Morning fresh batch baking'),
(3, 'Chocolate Truffle Cake', 'INITIAL_STOCK', 10, 0, 10, 'Fresh refrigerated batch display'),
(4, 'Butter Biscuits (Cookies)', 'INITIAL_STOCK', 10, 0, 10, 'Daily bakery packaging'),
(5, 'Vanilla Cream Roll', 'INITIAL_STOCK', 10, 0, 10, 'Fresh daily production');
