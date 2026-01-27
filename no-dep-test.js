const fs = require('fs');
const path = require('path');
const http = require('http');

// 测试图片合成API
function testImageSynthesis() {
  console.log('开始测试图片合成API...');
  
  // 定义参数
  const testImagePath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'uploads', 'test.jpg');
  const backendUrl = 'http://localhost:5000/api/upload/synthesize';
  
  // 检查测试图片是否存在
  if (!fs.existsSync(testImagePath)) {
    console.error('测试图片不存在:', testImagePath);
    return;
  }
  
  console.log('测试图片:', testImagePath);
  console.log('后端API:', backendUrl);
  
  // 读取图片文件
  const imageData = fs.readFileSync(testImagePath);
  
  // 构建边界字符串
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  
  // 构建请求体
  const crlf = '\r\n';
  const formData = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="image"; filename="test.jpg"',
    'Content-Type: image/jpeg',
    '',
    imageData,
    `--${boundary}--`,
    ''
  ].join(crlf);
  
  // 构建请求选项
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/upload/synthesize',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': Buffer.byteLength(formData)
    }
  };
  
  // 发送请求
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('\n响应状态:', res.statusCode);
      console.log('响应数据:', data);
      
      if (res.statusCode === 200) {
        try {
          const result = JSON.parse(data);
          console.log('\n✅ API调用成功！');
          console.log('图片URL:', result.imageUrl);
          console.log('完整URL:', result.fullUrl);
        } catch (e) {
          console.log('\n⚠️  响应数据不是有效的JSON:', e.message);
        }
      } else {
        console.log('\n❌ API调用失败');
      }
    });
  });
  
  req.on('error', (e) => {
    console.error('请求失败:', e.message);
  });
  
  req.write(formData);
  req.end();
}

// 运行测试
testImageSynthesis();