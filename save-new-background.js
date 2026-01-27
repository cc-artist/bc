const fs = require('fs');
const path = require('path');

// 保存新的赛博佛祖背景图
function saveNewBackground() {
  try {
    console.log('开始保存新的赛博佛祖背景图...');
    
    // 使用用户提供的新赛博佛祖背景图
    // 注意：这里我们假设新的背景图已经通过某种方式保存到了当前目录
    // 实际实现中，可能需要从请求中获取图片数据
    const newBackgroundImagePath = path.join(__dirname, 'new-cyber-buddha.png');
    
    // 检查新背景图是否存在
    if (!fs.existsSync(newBackgroundImagePath)) {
      console.error('错误: 新的赛博佛祖背景图不存在:', newBackgroundImagePath);
      return;
    }
    
    // 更新背景图保存路径
    const savePath = path.join(__dirname, '赛博佛祖背景图.png');
    
    // 复制新背景图到目标位置
    console.log(`正在复制新背景图到: ${savePath}`);
    fs.copyFileSync(newBackgroundImagePath, savePath);
    
    console.log('新背景图保存成功!');
    
    // 运行上传脚本
    console.log('\n开始运行上传脚本...');
    const { execSync } = require('child_process');
    execSync('node upload-background.js', { stdio: 'inherit' });
    
    console.log('\n所有操作完成!');
    console.log('请重启前后端服务以应用新的背景图。');
    
  } catch (error) {
    console.error('保存新背景图失败:', error.message);
    console.error('错误详情:', error.stack);
  }
}

// 运行函数
saveNewBackground();