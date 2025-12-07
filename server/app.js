const express = require('express');
const cors = require('cors');
const { products } = require('./data');

const app = express();

// 开启CORS允许跨域
app.use(cors());
app.use(express.json());

// 获取商品列表
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

// 获取单个商品详情
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: '商品不存在' });
  }
});

// 提交订单
app.post('/api/order', (req, res) => {
  setTimeout(() => {
    const orderId = 'NO.' + Date.now();
    res.json({ 
      success: true, 
      orderId: orderId,
      message: '下单成功'
    });
  }, 1000);
});

// 监听 0.0.0.0 以允许局域网访问
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`后端服务已启动: http://0.0.0.0:${PORT}`);
  console.log('请确保防火墙允许此端口的访问');
});
