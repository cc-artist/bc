const mockDB = require('../config/mockData');

// 获取所有寺庙
const getAllTemples = async (req, res) => {
  try {
    const temples = await mockDB.temples.find();
    res.status(200).json({
      status: 'success',
      data: temples,
      message: '获取寺庙列表成功'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '获取寺庙列表失败',
      error: error.message
    });
  }
};

// 根据ID获取寺庙
const getTempleById = async (req, res) => {
  try {
    const { id } = req.params;
    const temple = await mockDB.temples.findOne({ id: parseInt(id) });
    
    if (!temple) {
      return res.status(404).json({
        status: 'error',
        message: '寺庙不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: temple,
      message: '获取寺庙详情成功'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '获取寺庙详情失败',
      error: error.message
    });
  }
};

// 创建寺庙
const createTemple = async (req, res) => {
  try {
    const templeData = req.body;
    
    // 检查ID是否已存在
    const existingTemple = await mockDB.temples.findOne({ id: templeData.id });
    if (existingTemple) {
      return res.status(400).json({
        status: 'error',
        message: '寺庙ID已存在'
      });
    }
    
    const temple = await mockDB.temples.create(templeData);
    res.status(201).json({
      status: 'success',
      data: temple,
      message: '创建寺庙成功'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '创建寺庙失败',
      error: error.message
    });
  }
};

// 更新寺庙
const updateTemple = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const temple = await mockDB.temples.findOne({ id: parseInt(id) });
    
    if (!temple) {
      return res.status(404).json({
        status: 'error',
        message: '寺庙不存在'
      });
    }
    
    const updatedTemple = await mockDB.temples.update({ id: parseInt(id) }, updateData);
    
    res.status(200).json({
      status: 'success',
      data: updatedTemple,
      message: '更新寺庙成功'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '更新寺庙失败',
      error: error.message
    });
  }
};

// 删除寺庙
const deleteTemple = async (req, res) => {
  try {
    const { id } = req.params;
    
    const temple = await mockDB.temples.findOne({ id: parseInt(id) });
    
    if (!temple) {
      return res.status(404).json({
        status: 'error',
        message: '寺庙不存在'
      });
    }
    
    await mockDB.temples.delete({ id: parseInt(id) });
    
    res.status(200).json({
      status: 'success',
      message: '删除寺庙成功'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '删除寺庙失败',
      error: error.message
    });
  }
};

// 初始化寺庙数据
const initTemples = async (req, res) => {
  try {
    // 模拟初始化成功
    res.status(200).json({
      status: 'success',
      message: '初始化寺庙数据成功',
      data: await mockDB.temples.find()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '初始化寺庙数据失败',
      error: error.message
    });
  }
};

module.exports = {
  getAllTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
  initTemples
};