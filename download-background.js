const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// 下载并保存新的赛博佛祖背景图
async function downloadBackground() {
  try {
    console.log('开始下载新的赛博佛祖背景图...');
    
    // 图片URL - 这里应该替换为用户提供的图片URL
    // 由于用户直接在对话中提供了图片，我们需要从对话中获取图片数据
    // 在实际应用中，这可能是一个API端点或其他获取图片的方式
    // 这里我们模拟获取图片数据
    const imageUrl = 'https://example.com/new-cyber-buddha.png';
    
    // 本地保存路径
    const savePath = path.join(__dirname, 'new-cyber-buddha.png');
    
    console.log('正在下载图片...');
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`下载图片失败: ${response.statusText}`);
    }
    
    // 读取图片数据
    const buffer = await response.buffer();
    
    // 保存图片到本地
    console.log(`正在保存图片到: ${savePath}`);
    fs.writeFileSync(savePath, buffer);
    
    console.log('图片保存成功!');
    console.log(`文件大小: ${buffer.length} 字节`);
    
    // 运行保存背景图的脚本
    console.log('\n开始运行保存背景图脚本...');
    const { execSync } = require('child_process');
    execSync('node save-background.js', { stdio: 'inherit' });
    
  } catch (error) {
    console.error('下载背景图失败:', error.message);
    console.error('错误详情:', error.stack);
  }
}

// 运行函数
downloadBackground();