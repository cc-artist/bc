// 认证中间件
const authenticate = (req, res, next) => {
  try {
    // 检查会话是否已认证
    if (req.session && req.session.isAuthenticated) {
      // 认证成功，继续处理请求
      next();
    } else {
      // 认证失败，返回401错误
      res.status(401).json({
        status: 'error',
        message: '未授权访问，请先登录'
      });
    }
  } catch (error) {
    console.error('认证中间件错误:', error);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
};

module.exports = authenticate;
