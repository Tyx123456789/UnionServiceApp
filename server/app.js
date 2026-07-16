const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: '查询失败' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: '查询失败' });
    } else if (results.length === 0) {
      res.status(404).json({ success: false, message: '商品不存在' });
    } else {
      res.json({ success: true, data: results[0] });
    }
  });
});

app.get('/api/user', (req, res) => {
  pool.query('SELECT * FROM users WHERE id = 1', (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: '查询失败' });
    } else if (results.length === 0) {
      res.status(404).json({ success: false, message: '用户不存在' });
    } else {
      res.json({ success: true, data: results[0] });
    }
  });
});

app.post('/api/order', (req, res) => {
  const { productId, totalAmount } = req.body;
  const orderNo = 'NO.' + Date.now();
  const userId = 1;

  pool.query('INSERT INTO orders (order_no, user_id, product_ids, total_amount, status) VALUES (?, ?, ?, ?, ?)',
    [orderNo, userId, JSON.stringify([productId]), totalAmount, 'completed'],
    (error) => {
      if (error) {
        res.status(500).json({ success: false, message: '下单失败' });
      } else {
        res.json({ success: true, orderId: orderNo, message: '下单成功' });
      }
    }
  );
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`后端服务已启动: http://0.0.0.0:${PORT}`);
  console.log('请确保防火墙允许此端口的访问');
});