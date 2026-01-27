const mockDB = require('../config/mockData');

// 创建咨询预约
const createConsultation = async (req, res) => {
  try {
    const consultationData = req.body;
    
    // 验证必填字段
    if (!consultationData.name || !consultationData.phone || !consultationData.templeId) {
      return res.status(400).json({
        status: 'error',
        message: '请提供姓名、电话和寺庙ID'
      });
    }
    
    // 验证电话号码格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(consultationData.phone)) {
      return res.status(400).json({
        status: 'error',
        message: '请提供有效的手机号码'
      });
    }
    
    // 创建咨询预约
    const consultation = await mockDB.consultations.create(consultationData);
    
    res.status(201).json({
      status: 'success',
      data: consultation,
      message: '预约咨询成功，我们会尽快与您联系'
    });
  } catch (error) {
    console.error('创建咨询预约失败:', error);
    res.status(500).json({
      status: 'error',
      message: '创建咨询预约失败',
      error: error.message
    });
  }
};

// 获取所有咨询预约
const getAllConsultations = async (req, res) => {
  try {
    const consultations = await mockDB.consultations.find();
    res.status(200).json({
      status: 'success',
      data: consultations,
      message: '获取咨询预约列表成功'
    });
  } catch (error) {
    console.error('获取咨询预约列表失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取咨询预约列表失败',
      error: error.message
    });
  }
};

// 根据ID获取咨询预约
const getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await mockDB.consultations.findById(id);
    
    if (!consultation) {
      return res.status(404).json({
        status: 'error',
        message: '咨询预约不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: consultation,
      message: '获取咨询预约详情成功'
    });
  } catch (error) {
    console.error('获取咨询预约详情失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取咨询预约详情失败',
      error: error.message
    });
  }
};

// 更新咨询预约状态
const updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // 验证状态值
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: '无效的状态值'
      });
    }
    
    const consultation = await mockDB.consultations.findByIdAndUpdate(id, { status });
    
    if (!consultation) {
      return res.status(404).json({
        status: 'error',
        message: '咨询预约不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: consultation,
      message: '更新咨询预约状态成功'
    });
  } catch (error) {
    console.error('更新咨询预约状态失败:', error);
    res.status(500).json({
      status: 'error',
      message: '更新咨询预约状态失败',
      error: error.message
    });
  }
};

// 删除咨询预约
const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const consultation = await mockDB.consultations.findByIdAndDelete(id);
    
    if (!consultation) {
      return res.status(404).json({
        status: 'error',
        message: '咨询预约不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: '删除咨询预约成功'
    });
  } catch (error) {
    console.error('删除咨询预约失败:', error);
    res.status(500).json({
      status: 'error',
      message: '删除咨询预约失败',
      error: error.message
    });
  }
};

// 获取咨询预约统计
const getConsultationStats = async (req, res) => {
  try {
    const stats = await mockDB.consultations.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: stats,
      message: '获取咨询预约统计成功'
    });
  } catch (error) {
    console.error('获取咨询预约统计失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取咨询预约统计失败',
      error: error.message
    });
  }
};

module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultationStatus,
  deleteConsultation,
  getConsultationStats
};