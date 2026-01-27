const fs = require('fs');
const path = require('path');
const { synthesizeImage } = require('./cyber-buddha-blessing/backend/services/synthesis');

// 测试图片路径 - 使用项目中的测试图片
const testImagePath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'uploads', 'test.jpg');

console.log('开始测试佛光效果...');
console.log('测试图片路径:', testImagePath);

// 检查测试图片是否存在
if (!fs.existsSync(testImagePath)) {
    console.error('测试图片不存在:', testImagePath);
    console.error('请确保测试图片存在后再运行测试');
    process.exit(1);
}

// 运行合成测试
synthesizeImage(testImagePath)
    .then(outputPath => {
        console.log('\n✅ 佛光效果测试成功！');
        console.log('输出图片路径:', outputPath);
        console.log('\n测试结果说明:');
        console.log('1. 物品边缘应该有明显的金色佛光');
        console.log('2. 光晕效果应该自然，不影响物品本身清晰度');
        console.log('3. 佛光应该呈现多层次效果，从边缘向外逐渐减弱');
        console.log('\n请在文件浏览器中查看输出图片，验证佛光效果是否符合预期。');
    })
    .catch(error => {
        console.error('\n❌ 佛光效果测试失败:', error.message);
        console.error('错误详情:', error.stack);
        process.exit(1);
    });