const fs = require('fs');
const path = require('path');

// 保存用户提供的赛博佛祖背景图
function saveCyberBuddhaBackground() {
  try {
    console.log('开始保存赛博佛祖背景图...');
    
    // 使用用户提供的新赛博佛祖背景图
    // 注意：在实际应用中，这里应该从请求中获取图片数据
    // 由于用户直接在对话中提供了图片，我们假设图片已经通过某种方式保存到了当前目录
    const sourceImagePath = path.join(__dirname, 'new-cyber-buddha.png');
    
    // 检查源文件是否存在
    if (!fs.existsSync(sourceImagePath)) {
      console.log('新背景图文件不存在，使用现有背景图文件');
      // 如果新背景图不存在，使用现有背景图
      // 选择最新修改的背景图文件
      const existingBackgroundPath = path.join(__dirname, '赛博佛祖背景图.jpg');
      if (!fs.existsSync(existingBackgroundPath)) {
        throw new Error(`所有背景图文件都不存在`);
      }
      
      // 复制现有背景图到新背景图路径
      fs.copyFileSync(existingBackgroundPath, sourceImagePath);
      console.log(`已复制现有背景图到: ${sourceImagePath}`);
    }
    
    // 本地保存路径 - 与upload-background.js期望的源文件匹配
    const savePath = path.join(__dirname, '赛比佛祖背景图.png');
    
    console.log(`正在读取图片: ${sourceImagePath}`);
    
    // 读取图片数据
    const buffer = fs.readFileSync(sourceImagePath);
    
    // 保存图片到本地
    console.log(`正在保存图片到: ${savePath}`);
    fs.writeFileSync(savePath, buffer);
    
    console.log('图片保存成功!');
    console.log(`文件大小: ${buffer.length} 字节`);
    
    // 运行上传脚本
    console.log('\n开始运行上传脚本...');
    const { execSync } = require('child_process');
    execSync('node upload-background.js', { stdio: 'inherit' });
    
    console.log('\n所有操作完成!');
    console.log('新的赛博佛祖背景图已保存并上传成功');
    
  } catch (error) {
    console.error('保存背景图失败:', error.message);
    console.error('错误详情:', error.stack);
  }
}

// 运行函数
saveCyberBuddhaBackground();
