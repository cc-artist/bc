const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const connectDB = require('./config/database');

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3001;

// 配置中间件
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置会话中间件
app.use(session({
  secret: process.env.SESSION_SECRET || 'cyber-buddha-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1小时过期
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

// 配置静态文件服务
app.use(express.static(path.join(__dirname, '../')));

// 导入路由
const templeRoutes = require('./routes/templeRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

// 注册路由
const API_PREFIX = process.env.API_PREFIX || '/api/v1';
app.use(`${API_PREFIX}/temples`, templeRoutes);
app.use(`${API_PREFIX}/consultations`, consultationRoutes);
app.use(`${API_PREFIX}/payments`, paymentRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '赛博佛祖后端服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 根路径
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '欢迎访问赛博佛祖后端API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      temples: `${API_PREFIX}/temples`,
      consultations: `${API_PREFIX}/consultations`,
      payments: `${API_PREFIX}/payments`
    }
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '接口不存在'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('错误:', err);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 赛博佛祖后端服务启动成功`);
  console.log(`📡 服务器地址: http://localhost:${PORT}`);
  console.log(`🌐 API前缀: ${API_PREFIX}`);
  console.log(`💡 环境: ${process.env.NODE_ENV}`);
});

module.exports = app;