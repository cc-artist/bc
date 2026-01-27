const fs = require('fs');
const path = require('path');

// 源文件路径（用户提供的新背景图）
const sourcePath = path.join(__dirname, '赛博佛祖背景图.png');

// 前端公共目录路径
const frontendPublicDir = path.join(__dirname, 'cyber-buddha-blessing', 'public');

// 需要替换的前端背景图文件
const frontendBackgrounds = [
  'buddha-background.png',
  'buddha-new.png'
];

console.log('开始替换前端公共目录中的背景图...');
console.log('源文件路径:', sourcePath);
console.log('前端公共目录:', frontendPublicDir);
console.log('需要替换的文件:', frontendBackgrounds);

// 检查源文件是否存在
if (!fs.existsSync(sourcePath)) {
  console.error('错误: 源文件不存在:', sourcePath);
  process.exit(1);
}

// 确保前端公共目录存在
if (!fs.existsSync(frontendPublicDir)) {
  console.error('错误: 前端公共目录不存在:', frontendPublicDir);
  process.exit(1);
}

// 获取源文件的统计信息
const sourceStats = fs.statSync(sourcePath);
console.log('源文件大小:', sourceStats.size, '字节');

// 替换每个前端背景图文件
frontendBackgrounds.forEach(backgroundFile => {
  const targetPath = path.join(frontendPublicDir, backgroundFile);
  
  try {
    // 复制文件
    fs.copyFileSync(sourcePath, targetPath);
    
    // 验证复制结果
    const targetStats = fs.statSync(targetPath);
    
    if (sourceStats.size === targetStats.size) {
      console.log(`✓ 替换成功: ${backgroundFile} (${targetStats.size} 字节)`);
    } else {
      console.error(`✗ 替换失败: ${backgroundFile} (文件大小不匹配)`);
    }
  } catch (error) {
    console.error(`✗ 替换失败: ${backgroundFile} (${error.message})`);
  }
});

console.log('前端公共目录背景图替换完成!');
