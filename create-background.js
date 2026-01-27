const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 创建赛博佛祖背景图
async function createCyberBuddhaBackground() {
  try {
    // 创建一个800x600的背景图
    const width = 800;
    const height = 600;
    
    // 创建背景图（使用渐变背景）
    const background = await sharp(Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="buddhaGlow" cx="50%" cy="50%" r="40%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#8676B6;stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:#ff00ff;stop-opacity:0.2" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- 背景渐变 -->
      <rect width="100%" height="100%" fill="url(#bgGradient)" />
      
      <!-- 光环效果 -->
      <circle cx="50%" cy="40%" r="150" fill="url(#buddhaGlow)" filter="url(#glow)" />
      
      <!-- 赛博佛祖剪影 -->
      <g transform="translate(${width/2}, ${height/2}) scale(0.8)">
        <!-- 莲花座 -->
        <ellipse cx="0" cy="120" rx="150" ry="60" fill="#2d1b41" />
        
        <!-- 身体 -->
        <ellipse cx="0" cy="0" rx="80" ry="120" fill="#1a1a2e" stroke="#00ffff" stroke-width="3" />
        
        <!-- 头部 -->
        <circle cx="0" cy="-100" r="50" fill="#1a1a2e" stroke="#00ffff" stroke-width="3" />
        
        <!-- 光环 -->
        <circle cx="0" cy="-100" r="60" fill="none" stroke="#00ffff" stroke-width="2" opacity="0.6" />
        
        <!-- 面部特征 -->
        <circle cx="-20" cy="-105" r="5" fill="#00ffff" />
        <circle cx="20" cy="-105" r="5" fill="#00ffff" />
        <ellipse cx="0" cy="-90" rx="15" ry="10" fill="#00ffff" />
        
        <!-- 手臂 -->
        <rect x="-100" y="-20" width="40" height="80" rx="20" fill="#1a1a2e" stroke="#00ffff" stroke-width="3" />
        <rect x="60" y="-20" width="40" height="80" rx="20" fill="#1a1a2e" stroke="#00ffff" stroke-width="3" />
        
        <!-- 赛博线条 -->
        <path d="M-80,0 L80,0" stroke="#00ffff" stroke-width="2" opacity="0.8" />
        <path d="M0,-120 L0,120" stroke="#00ffff" stroke-width="2" opacity="0.8" />
        <path d="M-60,-80 L60,-80" stroke="#00ffff" stroke-width="1" opacity="0.6" />
        <path d="M-60,-40 L60,-40" stroke="#00ffff" stroke-width="1" opacity="0.6" />
        <path d="M-60,40 L60,40" stroke="#00ffff" stroke-width="1" opacity="0.6" />
        <path d="M-60,80 L60,80" stroke="#00ffff" stroke-width="1" opacity="0.6" />
        
        <!-- 赛博元素 -->
        <rect x="-30" y="-30" width="60" height="20" rx="5" fill="#1a1a2e" stroke="#ff00ff" stroke-width="2" />
        <rect x="-25" y="-25" width="50" height="10" rx="3" fill="#ff00ff" opacity="0.5" />
      </g>
      
      <!-- 赛博元素装饰 -->
      <g transform="translate(${width*0.2}, ${height*0.2})">
        <rect x="0" y="0" width="40" height="40" fill="#00ffff" opacity="0.3" />
        <line x1="0" y1="0" x2="40" y2="40" stroke="#00ffff" stroke-width="2" opacity="0.8" />
        <line x1="40" y1="0" x2="0" y2="40" stroke="#00ffff" stroke-width="2" opacity="0.8" />
      </g>
      
      <g transform="translate(${width*0.8}, ${height*0.3})">
        <rect x="0" y="0" width="30" height="30" fill="#ff00ff" opacity="0.3" />
        <circle cx="15" cy="15" r="15" fill="#ff00ff" opacity="0.2" />
      </g>
      
      <g transform="translate(${width*0.85}, ${height*0.7})">
        <polygon points="0,0 30,15 0,30" fill="#00ffff" opacity="0.4" />
      </g>
      
      <g transform="translate(${width*0.15}, ${height*0.75})">
        <circle cx="0" cy="0" r="20" fill="#ff00ff" opacity="0.3" />
        <circle cx="0" cy="0" r="10" fill="#00ffff" opacity="0.5" />
      </g>
    </svg>`))
      .png()
      .toBuffer();
    
    // 保存图片到assets目录
    const outputPath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'assets', 'buddha-background.png');
    await sharp(background)
      .resize(800, 600, { fit: 'contain' })
      .png()
      .toFile(outputPath);
    
    console.log('赛博佛祖背景图创建成功！');
    console.log('图片路径:', outputPath);
    console.log('图片大小:', background.length, '字节');
    
    // 验证图片是否有效
    const metadata = await sharp(outputPath).metadata();
    console.log('图片元数据:', metadata);
    
  } catch (error) {
    console.error('创建背景图失败:', error);
  }
}

// 运行函数
createCyberBuddhaBackground();