const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// 路由定义

// 基础支付路由
router.post('/', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id/status', paymentController.updatePaymentStatus);
router.delete('/:id', paymentController.deletePayment);
router.get('/stats/summary', paymentController.getPaymentStats);

// 跨境支付路由
router.post('/init', paymentController.initPayment);
router.post('/:id/capture', paymentController.capturePayment);
router.post('/:id/refund', paymentController.refundPayment);
router.post('/webhook/:platform', paymentController.handleWebhook);
router.get('/platforms', paymentController.getPaymentPlatforms);
router.get('/:id/status', paymentController.getPaymentStatus);

module.exports = router;