const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// 路由定义
router.post('/', consultationController.createConsultation);
router.get('/', consultationController.getAllConsultations);
router.get('/:id', consultationController.getConsultationById);
router.put('/:id/status', consultationController.updateConsultationStatus);
router.delete('/:id', consultationController.deleteConsultation);
router.get('/stats/summary', consultationController.getConsultationStats);

module.exports = router;