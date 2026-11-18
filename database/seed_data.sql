-- =======================================================
-- 7M Hackathon - Initial Seed Data
-- =======================================================

USE hackathon_db;

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@hackathon.com', 'admin123', 'ADMIN'),
('Demo User', 'user@hackathon.com', 'user123', 'USER')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO items (title, description, status, user_id) VALUES
('Starter Feature', 'Initial project setup completed successfully', 'ACTIVE', 1),
('Hackathon Goal', 'Implement the hackathon problem statement solution', 'IN_PROGRESS', 2)
ON DUPLICATE KEY UPDATE title=VALUES(title);
