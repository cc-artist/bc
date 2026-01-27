const dotenv = require('dotenv');

dotenv.config();

// 管理员登录
const login = (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 验证凭证
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // 设置会话
      req.session.isAuthenticated = true;
      req.session.username = username;
      
      res.status(200).json({
        status: 'ok',
        message: '登录成功',
        data: {
          username,
          isAuthenticated: true
        }
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: '用户名或密码错误'
      });
    }
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
};

// 管理员登出
const logout = (req, res) => {
  try {
    // 销毁会话
    req.session.destroy((err) => {
      if (err) {
        console.error('登出错误:', err);
        res.status(500).json({
          status: 'error',
          message: '登出失败'
        });
      } else {
        res.status(200).json({
          status: 'ok',
          message: '登出成功'
        });
      }
    });
  } catch (error) {
    console.error('登出错误:', error);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
};

// 验证会话
const verify = (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      res.status(200).json({
        status: 'ok',
        message: '会话有效',
        data: {
          isAuthenticated: true,
          username: req.session.username
        }
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: '会话无效'
      });
    }
  } catch (error) {
    console.error('验证错误:', error);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
};

module.exports = {
  login,
  logout,
  verify
};
