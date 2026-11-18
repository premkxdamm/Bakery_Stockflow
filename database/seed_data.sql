-- =======================================================
-- Bakery Inventory Management System - Initial 5 Products
-- 10 quantity per product
-- =======================================================

USE hackathon_db;

-- 5 Core Bakery Products
INSERT INTO products (name, sku, category, price, quantity, description, status) VALUES
('Fresh Milk Bread', 'BAKE-BRD-001', 'Breads', 40.00, 10, 'Freshly baked white bread (400g)', 'IN_STOCK'),
('Ladi Pav (6 Pack)', 'BAKE-PAV-002', 'Breads', 25.00, 10, 'Soft and fluffy bakery ladi pav', 'IN_STOCK'),
('Chocolate Truffle Cake', 'BAKE-CAK-003', 'Cakes', 350.00, 10, 'Rich Dutch chocolate pastry cake (500g)', 'IN_STOCK'),
('Butter Biscuits (Cookies)', 'BAKE-BIS-004', 'Biscuits', 60.00, 10, 'Crispy handmade bakery butter cookies', 'IN_STOCK'),
('Vanilla Cream Roll', 'BAKE-CRM-005', 'Confectionery', 20.00, 10, 'Crispy puff pastry filled with cream', 'IN_STOCK');

-- Initial Stock Transactions
INSERT INTO inventory_transactions (name, quantity_changed, previous_quantity, new_quantity) VALUES
('Fresh Milk Bread', 10, 0, 10),
('Ladi Pav (6 Pack)', 10, 0, 10),
('Chocolate Truffle Cake', 10, 0, 10),
('Butter Biscuits (Cookies)', 10, 0, 10),
('Vanilla Cream Roll', 10, 0, 10);
