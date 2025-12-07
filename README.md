    # 工会服务平台 Demo

基于 Uni-app (Vue 3 + Vite) + Express 的局域网演示项目。

## 目录结构

```
union-demo/
├── server/         # Express 后端
└── client/         # Uni-app 前端
```

## 快速开始

### 1. 查看本机 IP 地址

```bash
# Windows CMD
ipconfig

# 找到 "IPv4 地址"，如：192.168.1.100
```

### 2. 修改前端 API 配置

编辑 `client/src/common/config.js`：

```javascript
export const API_BASE = "http://192.168.1.100:3000";  // 改成你的IP
```

### 3. 启动后端

```bash
cd union-demo/server
npm install
node app.js
```

后端运行在 `http://0.0.0.0:3000`

### 4. 启动前端

```bash
cd union-demo/client
npm install
npm run dev:h5
```

前端运行在 `http://0.0.0.0:5173`

### 5. 手机访问

确保手机和电脑在同一局域网，手机浏览器访问：

```
http://192.168.1.100:5173
```

## 功能页面

1. **首页** - 功能入口、Banner、卡片区
2. **商城列表** - 商品搜索、分类、列表
3. **商品详情** - 商品信息、购买操作
4. **订单确认** - 配送信息、费用明细
5. **支付成功** - 订单结果展示

## 注意事项

- 确保防火墙允许 3000 和 5173 端口
- 手机和电脑必须在同一 WiFi 网络
- 图片资源需要替换 `static/` 目录下的占位文件
