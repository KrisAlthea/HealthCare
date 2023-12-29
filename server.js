const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 代理配置
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8081', // 后端服务器地址
    changeOrigin: true,
}));

// 静态文件服务
app.use(express.static('src'));

// 监听端口
app.listen(3000, () => {
    console.log('代理服务器运行在 http://localhost:3000');
});
