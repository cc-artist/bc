const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('开始测试合成功能...');

// 使用已有的测试图片
const testImagePath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'uploads', 'test.jpg');

// 检查测试图片是否存在
if (!fs.existsSync(testImagePath)) {
  console.error('✗ 测试失败: 测试图片不存在');
  console.error('请确保 test.jpg 文件存在于 backend/uploads 目录中');
  process.exit(1);
}

console.log('使用测试图片:', testImagePath);

// 使用curl命令测试合成API
console.log('\n正在调用合成API...');
const command = `curl -X POST -F "image=@${testImagePath}" -o test-output.png http://localhost:5000/api/synthesize`;

try {
  execSync(command, { stdio: 'inherit' });
  console.log('\n合成成功! 输出文件: test-output.png');
  
  // 检查输出文件是否存在
  if (fs.existsSync('test-output.png')) {
    console.log('\n✓ 测试完成: 合成功能正常工作');
    console.log('合成结果已保存到 test-output.png，您可以查看该文件确认是否使用了新的赛博佛祖背景图');
  } else {
    console.error('\n✗ 测试失败: 未生成输出文件');
  }
} catch (error) {
  console.error('\n✗ 测试失败: 合成API调用失败', error.message);
}
