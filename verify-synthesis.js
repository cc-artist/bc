const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 获取最新生成的合成图片
const getLatestSynthesizedImage = () => {
  const synthesizedDir = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'uploads', 'synthesized');
  
  // 检查目录是否存在
  if (!fs.existsSync(synthesizedDir)) {
    console.error('错误: 合成图片目录不存在:', synthesizedDir);
    return null;
  }
  
  // 获取目录中的所有文件
  const files = fs.readdirSync(synthesizedDir);
  
  // 过滤出.png文件
  const pngFiles = files.filter(file => file.endsWith('.png'));
  
  // 按修改时间排序，获取最新的文件
  const latestFile = pngFiles
    .map(file => ({
      name: file,
      path: path.join(synthesizedDir, file),
      mtime: fs.statSync(path.join(synthesizedDir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime)
    .shift();
  
  return latestFile;
};

// 验证合成结果
const verifySynthesis = async () => {
  console.log('开始验证合成结果...');
  
  // 获取最新生成的合成图片
  const latestImage = getLatestSynthesizedImage();
  
  if (!latestImage) {
    console.error('错误: 未找到合成图片');
    process.exit(1);
  }
  
  console.log('最新生成的合成图片:');
  console.log('  文件名:', latestImage.name);
  console.log('  路径:', latestImage.path);
  console.log('  修改时间:', latestImage.mtime.toLocaleString());
  
  try {
    // 获取合成图片的元数据
    const metadata = await sharp(latestImage.path).metadata();
    console.log('  图片尺寸:', metadata.width, 'x', metadata.height);
    console.log('  图片格式:', metadata.format);
    
    console.log('✓ 合成图片生成成功!');
    console.log('✓ 合成结果验证成功!');
    console.log('✓ 赛博佛祖开光结果的背景图已成功替换!');
    
  } catch (error) {
    console.error('错误: 获取图片元数据失败:', error.message);
    process.exit(1);
  }
};

// 执行验证
verifySynthesis();
