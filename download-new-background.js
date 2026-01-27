const fs = require('fs');
const path = require('path');
const https = require('https');

// 用户提供的图片URL
const imageUrl = 'https://i.imgur.com/8J4X8zE.png';

// 本地保存路径
const savePath = path.join(__dirname, '赛博佛祖背景图.png');

function downloadAndSaveBackground() {
  try {
    console.log('开始下载新的赛博佛祖背景图...');
    console.log('图片URL:', imageUrl);
    console.log('保存路径:', savePath);
    
    // 发送HTTP请求获取图片数据
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        throw new Error(`下载失败: 状态码 ${response.statusCode}`);
      }
      
      // 读取图片数据
      const chunks = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        // 保存图片到本地
        fs.writeFileSync(savePath, buffer);
        
        console.log('图片保存成功!');
        console.log(`文件大小: ${buffer.length} 字节`);
        console.log('文件路径:', savePath);
      });
    }).on('error', (error) => {
      throw error;
    });
    
  } catch (error) {
    console.error('下载并保存图片失败:', error.message);
    console.error('错误详情:', error.stack);
    process.exit(1);
  }
}

// 运行函数
downloadAndSaveBackground();
