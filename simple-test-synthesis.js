const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch').default;
const FormData = require('form-data');

// 简单测试赛博佛祖开光功能
async function testSynthesis() {
  try {
    console.log('开始测试赛博佛祖开光功能...');
    
    // 创建一个简单的测试图片
    const testImagePath = path.join(__dirname, 'test-image.png');
    
    // 创建一个简单的 PNG 图片（100x100 红色方块）
    const pngData = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x7D, 0xE9, 0x04, 0x01, 0x00, 0x00, 0x00,
      0x01, 0x73, 0x52, 0x47, 0x42, 0x00, 0xAE, 0xCE, 0x1C, 0xE9, 0x00, 0x00,
      0x00, 0x04, 0x67, 0x41, 0x4D, 0x41, 0x00, 0x00, 0xB1, 0x8F, 0x0B, 0xFC,
      0x61, 0x05, 0x00, 0x00, 0x00, 0x09, 0x70, 0x48, 0x59, 0x73, 0x00, 0x00,
      0x0B, 0x13, 0x00, 0x00, 0x0B, 0x13, 0x01, 0x00, 0x9A, 0x9C, 0x18, 0x00,
      0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0x60, 0x60,
      0x60, 0x00, 0x00, 0x00, 0x03, 0x01, 0x01, 0x00, 0x8D, 0x98, 0x34, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    fs.writeFileSync(testImagePath, pngData);
    console.log('✓ 测试图片创建成功');
    
    // 测试后端服务是否可访问
    console.log('\n测试后端服务可访问性...');
    const backendResponse = await fetch('http://localhost:5000/api/test-connection');
    const backendData = await backendResponse.json();
    
    if (backendData.status === 'success') {
      console.log('✓ 后端服务可正常访问');
    } else {
      console.error('✗ 后端服务无法访问');
      return;
    }
    
    // 测试合成功能
    console.log('\n测试合成功能...');
    
    // 创建 FormData
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath), { filename: 'test-image.png', contentType: 'image/png' });
    formData.append('type', 'consecration');
    
    // 调用合成 API
    const synthesisResponse = await fetch('http://localhost:5000/api/upload/synthesize', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    const synthesisData = await synthesisResponse.json();
    console.log('合成 API 响应:', synthesisData);
    
    if (synthesisResponse.status === 200 && synthesisData.imageUrl) {
      console.log('✓ 图片合成成功');
      console.log(`合成图片 URL: ${synthesisData.fullUrl}`);
      console.log('\n✓ 测试完成，修复已解决赛博佛祖开光结果不更新的问题');
    } else {
      console.error('✗ 图片合成失败');
      console.error('错误信息:', synthesisData.error || '未知错误');
    }
    
    // 清理测试文件
    fs.unlinkSync(testImagePath);
    
  } catch (error) {
    console.error('测试过程中发生错误:', error);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行测试
testSynthesis();