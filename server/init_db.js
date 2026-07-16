const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('连接失败:', err);
    process.exit(1);
  }
  console.log('连接成功');
  
  connection.query('CREATE DATABASE IF NOT EXISTS union_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
    if (err) {
      console.error('创建数据库失败:', err);
      process.exit(1);
    }
    console.log('数据库创建成功');
    
    connection.query('USE union_service', (err) => {
      if (err) {
        console.error('选择数据库失败:', err);
        process.exit(1);
      }
      
      const createProductsTable = `
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
        )
      `;
      
      connection.query(createProductsTable, (err) => {
        if (err) {
          console.error('创建products表失败:', err);
          process.exit(1);
        }
        console.log('products表创建成功');
        
        const createUsersTable = `
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
          )
        `;
        
        connection.query(createUsersTable, (err) => {
          if (err) {
            console.error('创建users表失败:', err);
            process.exit(1);
          }
          console.log('users表创建成功');
          
          const createOrdersTable = `
            CREATE TABLE IF NOT EXISTS orders (
              id INT PRIMARY KEY AUTO_INCREMENT,
              order_no VARCHAR(100) NOT NULL UNIQUE,
              user_id INT DEFAULT 1,
              product_ids TEXT,
              total_amount DECIMAL(10,2) NOT NULL,
              status VARCHAR(20) DEFAULT 'pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `;
          
          connection.query(createOrdersTable, (err) => {
            if (err) {
              console.error('创建orders表失败:', err);
              process.exit(1);
            }
            console.log('orders表创建成功');
            
            connection.query('DELETE FROM products', () => {
              const productsData = [
                ['三色鸽美味蛋糕', 60.80, 88.00, 996, 4.6, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587'],
                ['南阳吾悦广场饮品店', 10.00, 15.00, 196, 5.0, 'https://images.unsplash.com/photo-1544145945-f90425340c7e'],
                ['万达广场水果店', 20.00, 30.00, 1961, 5.0, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf'],
                ['市体育中心游泳馆门票', 18.00, 35.00, 852, 4.9, 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7']
              ];
              
              connection.query('INSERT INTO products (name, price, original_price, sales, rating, img) VALUES ?', [productsData], (err) => {
                if (err) {
                  console.error('插入商品数据失败:', err);
                  process.exit(1);
                }
                console.log('商品数据插入成功');
                
                connection.query('DELETE FROM users', () => {
                  connection.query('INSERT INTO users (username, nickname, points, welfare, coupons, level, member_status, union_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    ['zhang', '张先生', 2330, 1580.00, 5, 'VIP2', '正式会员', '南阳市总工会'], (err) => {
                      if (err) {
                        console.error('插入用户数据失败:', err);
                        process.exit(1);
                      }
                      console.log('用户数据插入成功');
                      console.log('数据库初始化完成！');
                      connection.end();
                    }
                  );
                });
              });
            });
          });
        });
      });
    });
  });
});