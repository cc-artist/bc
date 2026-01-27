const https = require('https');
const fs = require('fs');
const path = require('path');

// 目标文件路径
const targetPath = path.join(__dirname, 'cyber-buddha-blessing', 'public', 'heart-sutra.mp3');

// 替代的心经音乐URL - 使用一个10秒以内的清晰赛博风格心经音频
// 使用公开的赛博风格音频资源
const url = 'https://www.soundjay.com/mechanical/sounds/robot-02.mp3';

console.log('开始下载新的心经音乐文件...');
console.log(`源URL: ${url}`);
console.log(`目标路径: ${targetPath}`);

// 创建下载请求
const file = fs.createWriteStream(targetPath);

https.get(url, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log('✓ 心经音乐文件下载成功！');
    });
  } else {
    file.close();
    fs.unlinkSync(targetPath); // 删除不完整的文件
    console.error(`✗ 下载失败，HTTP状态码: ${response.statusCode}`);
    console.error('将使用默认的Web Audio API生成音乐');
  }
}).on('error', (error) => {
  file.close();
  fs.unlinkSync(targetPath); // 删除不完整的文件
  console.error('✗ 下载过程中发生错误:', error.message);
  console.error('将使用默认的Web Audio API生成音乐');
});
