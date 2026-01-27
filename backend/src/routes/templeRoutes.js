const express = require('express');
const router = express.Router();
const templeController = require('../controllers/templeController');

// 路由定义
router.get('/', templeController.getAllTemples);
router.get('/:id', templeController.getTempleById);
router.post('/', templeController.createTemple);
router.put('/:id', templeController.updateTemple);
router.delete('/:id', templeController.deleteTemple);
router.post('/init', templeController.initTemples);

module.exports = router;