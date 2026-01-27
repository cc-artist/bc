const http = require('http');
const fs = require('fs');
const path = require('path');

// 测试图片路径
const testImagePath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'uploads', 'test.jpg');

// 检查测试图片是否存在
if (!fs.existsSync(testImagePath)) {
    console.error('测试图片不存在:', testImagePath);
    process.exit(1);
}

// 读取测试图片
const imageData = fs.readFileSync(testImagePath);

// 生成边界字符串
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2, 15);

// 构建multipart/form-data请求体
const formData = `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="image"; filename="test.jpg"\r\n` +
    `Content-Type: image/jpeg\r\n\r\n` +
    imageData.toString('binary') + `\r\n` +
    `--${boundary}--\r\n`;

// 请求选项
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/upload/synthesize',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(formData, 'binary')
    }
};

console.log('开始测试前端API路由...');
console.log('请求URL:', 'http://localhost:3000/api/upload/synthesize');
console.log('测试图片:', testImagePath);

// 发送请求
const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log('响应头:', res.headers);
    
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    
    res.on('end', () => {
        try {
            const data = JSON.parse(responseData);
            console.log('响应数据:', JSON.stringify(data, null, 2));
            if (res.statusCode === 200) {
                console.log('✓ 前端API路由测试成功!');
            } else {
                console.error('✗ 前端API路由测试失败:', data.error);
            }
        } catch (e) {
            console.error('✗ 响应解析失败:', e.message);
            console.error('原始响应:', responseData);
        }
    });
});

req.on('error', (e) => {
    console.error('✗ 请求错误:', e.message);
});

// 发送请求体
req.write(formData, 'binary');
req.end();