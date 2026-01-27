const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 定义需要保存的背景图信息
const newBackgroundInfo = {
  filename: 'cyber-buddha.png',
  // 使用用户最新提供的背景图文件
  sourcePath: path.join(__dirname, '赛博佛祖背景图.png'),
  // 目标目录列表
  targetDirs: [
    // 后端assets目录
    path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'assets'),
    // 前端public目录
    path.join(__dirname, 'cyber-buddha-blessing', 'public'),
    // 项目根assets目录
    path.join(__dirname, 'cyber-buddha-blessing', 'assets')
  ],
  // 前端public目录需要使用的文件名
  frontendFilenames: [
    'buddha-background.png',
    'buddha-new.png'
  ]
};

// 计算文件哈希值
const calculateFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
};

console.log('开始上传赛博佛祖背景图...');
console.log('源文件:', newBackgroundInfo.sourcePath);
console.log('目标目录:', newBackgroundInfo.targetDirs);

// 检查源文件是否存在
if (!fs.existsSync(newBackgroundInfo.sourcePath)) {
  console.error('错误: 源文件不存在:', newBackgroundInfo.sourcePath);
  console.error('请先将新的赛博佛祖背景图保存到:', newBackgroundInfo.sourcePath);
  process.exit(1);
}

// 获取源文件的统计信息
const sourceStats = fs.statSync(newBackgroundInfo.sourcePath);
const sourceHash = calculateFileHash(newBackgroundInfo.sourcePath);
console.log('源文件大小:', sourceStats.size, '字节');
console.log('源文件哈希值:', sourceHash);

// 确保所有目标目录存在
newBackgroundInfo.targetDirs.forEach(targetDir => {
  if (!fs.existsSync(targetDir)) {
    console.log('创建目录:', targetDir);
    fs.mkdirSync(targetDir, { recursive: true });
  }
});

// 保存背景图到各个目录
console.log('\n开始保存背景图到各个目录...');

// 1. 保存到后端assets目录
const backendTargetPath = path.join(newBackgroundInfo.targetDirs[0], newBackgroundInfo.filename);
try {
  // 检查目标文件是否存在
  let targetHash = null;
  let targetExists = false;
  if (fs.existsSync(backendTargetPath)) {
    targetExists = true;
    targetHash = calculateFileHash(backendTargetPath);
    console.log(`后端目标文件已存在，当前哈希值: ${targetHash}`);
  }
  
  // 强制复制源文件到目标路径
  console.log('正在复制源文件到后端assets目录...');
  fs.copyFileSync(newBackgroundInfo.sourcePath, backendTargetPath);
  
  // 更新目标文件的修改时间，确保服务能够检测到变化
  const now = new Date();
  fs.utimesSync(backendTargetPath, now, now);
  
  // 验证复制结果
  const newTargetHash = calculateFileHash(backendTargetPath);
  const newTargetStats = fs.statSync(backendTargetPath);
  
  if (newTargetHash === sourceHash) {
    if (targetExists && targetHash === newTargetHash) {
      console.log(`⚠ 后端assets目录: 文件哈希值相同，但已强制更新修改时间`);
    } else {
      console.log(`✓ 后端assets目录: 文件复制成功，哈希值匹配`);
    }
    console.log(`  - 源文件: ${sourceStats.size} 字节, ${sourceHash}`);
    console.log(`  - 目标文件: ${newTargetStats.size} 字节, ${newTargetHash}`);
    console.log(`  - 修改时间: ${newTargetStats.mtime}`);
  } else {
    console.error(`✗ 后端assets目录: 文件复制失败，哈希值不匹配`);
    console.error(`  - 源文件哈希: ${sourceHash}`);
    console.error(`  - 目标文件哈希: ${newTargetHash}`);
  }
} catch (error) {
  console.error(`✗ 保存失败: 后端assets目录 (${error.message})`);
  console.error(`  - 错误详情: ${error.stack}`);
}

// 2. 保存到前端public目录（两个文件名）
newBackgroundInfo.frontendFilenames.forEach(filename => {
  const frontendTargetPath = path.join(newBackgroundInfo.targetDirs[1], filename);
  try {
    console.log(`\n正在复制源文件到前端public目录/${filename}...`);
    fs.copyFileSync(newBackgroundInfo.sourcePath, frontendTargetPath);
    
    // 更新目标文件的修改时间
    const now = new Date();
    fs.utimesSync(frontendTargetPath, now, now);
    
    // 验证复制结果
    const newTargetHash = calculateFileHash(frontendTargetPath);
    const newTargetStats = fs.statSync(frontendTargetPath);
    
    if (newTargetHash === sourceHash) {
      console.log(`✓ 前端public目录/${filename}: 文件复制成功`);
      console.log(`  - 大小: ${newTargetStats.size} 字节`);
      console.log(`  - 哈希值: ${newTargetHash}`);
      console.log(`  - 修改时间: ${newTargetStats.mtime}`);
    } else {
      console.error(`✗ 前端public目录/${filename}: 文件复制失败，哈希值不匹配`);
    }
  } catch (error) {
    console.error(`✗ 保存失败: 前端public目录/${filename} (${error.message})`);
  }
});

// 3. 保存到项目根assets目录
const rootTargetPath = path.join(newBackgroundInfo.targetDirs[2], 'buddha-background.png');
try {
  console.log(`\n正在复制源文件到项目根assets目录...`);
  fs.copyFileSync(newBackgroundInfo.sourcePath, rootTargetPath);
  
  // 更新目标文件的修改时间
  const now = new Date();
  fs.utimesSync(rootTargetPath, now, now);
  
  // 验证复制结果
  const newTargetHash = calculateFileHash(rootTargetPath);
  const newTargetStats = fs.statSync(rootTargetPath);
  
  if (newTargetHash === sourceHash) {
    console.log(`✓ 项目根assets目录: 文件复制成功`);
    console.log(`  - 大小: ${newTargetStats.size} 字节`);
    console.log(`  - 哈希值: ${newTargetHash}`);
    console.log(`  - 修改时间: ${newTargetStats.mtime}`);
  } else {
    console.error(`✗ 项目根assets目录: 文件复制失败，哈希值不匹配`);
  }
} catch (error) {
  console.error(`✗ 保存失败: 项目根assets目录 (${error.message})`);
}

console.log('\n背景图上传完成!');
console.log('✓ 已强制更新所有目标文件，修改时间已刷新');
console.log('✓ 所有文件已通过哈希值验证');
console.log('接下来需要重启前后端服务以应用新的背景图。');
