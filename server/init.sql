CREATE DATABASE IF NOT EXISTS union_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE union_service;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  sales INT DEFAULT 0,
  rating DECIMAL(3,1) DEFAULT 0,
  img VARCHAR(500) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  nickname VARCHAR(100) DEFAULT '',
  points INT DEFAULT 0,
  welfare DECIMAL(10,2) DEFAULT 0,
  coupons INT DEFAULT 0,
  level VARCHAR(20) DEFAULT '',
  member_status VARCHAR(50) DEFAULT '',
  union_name VARCHAR(100) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_no VARCHAR(100) NOT NULL UNIQUE,
  user_id INT DEFAULT 1,
  product_ids TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, original_price, sales, rating, img) VALUES
('Cake', 60.80, 88.00, 996, 4.6, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587'),
('Drink', 10.00, 15.00, 196, 5.0, 'https://images.unsplash.com/photo-1544145945-f90425340c7e'),
('Fruit', 20.00, 30.00, 1961, 5.0, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf'),
('Swimming', 18.00, 35.00, 852, 4.9, 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7');

INSERT INTO users (username, nickname, points, welfare, coupons, level, member_status, union_name) VALUES
('zhang', 'Mr Zhang', 2330, 1580.00, 5, 'VIP2', 'Member', 'Union');
