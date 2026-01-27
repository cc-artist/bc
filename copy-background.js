const fs = require('fs');
const path = require('path');

// 源文件路径（用户提供的新背景图）
const sourcePath = path.join(__dirname, '赛博佛祖背景图.png');

// 目标文件路径（合成服务使用的背景图）
const targetPath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'assets', 'cyber-buddha.png');

console.log('开始复制背景图...');
console.log('源文件路径:', sourcePath);
console.log('目标文件路径:', targetPath);

// 检查源文件是否存在
if (!fs.existsSync(sourcePath)) {
  console.error('错误: 源文件不存在:', sourcePath);
  process.exit(1);
}

// 确保目标目录存在
const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  console.log('创建目标目录:', targetDir);
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件
fs.copyFile(sourcePath, targetPath, (err) => {
  if (err) {
    console.error('复制文件失败:', err);
    process.exit(1);
  }
  console.log('背景图复制成功!');
  
  // 验证复制结果
  const sourceStats = fs.statSync(sourcePath);
  const targetStats = fs.statSync(targetPath);
  console.log('源文件大小:', sourceStats.size, '字节');
  console.log('目标文件大小:', targetStats.size, '字节');
  
  if (sourceStats.size === targetStats.size) {
    console.log('✓ 复制验证成功: 文件大小匹配');
  } else {
    console.error('✗ 复制验证失败: 文件大小不匹配');
    process.exit(1);
  }
});
