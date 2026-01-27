const http = require('http');

// 测试获取寺庙列表
const testTemplesApi = () => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/v1/temples',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('响应体:');
      try {
        const jsonData = JSON.parse(data);
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (error) {
        console.log(data);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  req.end();
};

// 测试健康检查
const testHealthApi = () => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/health',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`健康检查状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('健康检查响应:');
      console.log(data);
    });
  });

  req.on('error', (e) => {
    console.error(`健康检查请求遇到问题: ${e.message}`);
  });

  req.end();
};

// 运行测试
console.log('开始测试后端API...');
console.log('=' * 50);
testHealthApi();

// 等待1秒后测试寺庙API
setTimeout(() => {
  console.log('\n' + '=' * 50);
  console.log('测试寺庙API:');
  testTemplesApi();
}, 1000);