const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 登录端点
router.post('/login', authController.login);

// 登出端点
router.post('/logout', authController.logout);

// 验证会话端点
router.get('/verify', authController.verify);

module.exports = router;
