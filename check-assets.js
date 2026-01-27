const fs = require('fs');
const path = require('path');

// 定义要检查的路径
const backendPath = path.join(__dirname, 'cyber-buddha-blessing', 'backend');
const assetsPath = path.join(backendPath, 'assets');
const backgroundImagePath = path.join(assetsPath, 'buddha-background.png');

console.log('检查路径:');
console.log('Backend目录:', backendPath);
console.log('Assets目录:', assetsPath);
console.log('背景图片:', backgroundImagePath);

// 检查backend目录
if (fs.existsSync(backendPath)) {
    console.log('✅ Backend目录存在');
} else {
    console.log('❌ Backend目录不存在');
}

// 检查assets目录
if (fs.existsSync(assetsPath)) {
    console.log('✅ Assets目录存在');
    
    // 列出assets目录下的文件
    const files = fs.readdirSync(assetsPath);
    console.log('Assets目录下的文件:', files);
    
    // 检查背景图片
    if (fs.existsSync(backgroundImagePath)) {
        console.log('✅ 背景图片存在');
        const stats = fs.statSync(backgroundImagePath);
        console.log('背景图片大小:', stats.size, '字节');
    } else {
        console.log('❌ 背景图片不存在');
        // 检查是否有其他图片文件
        const imageFiles = files.filter(file => 
            ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase())
        );
        console.log('Assets目录下的图片文件:', imageFiles);
    }
} else {
    console.log('❌ Assets目录不存在');
}