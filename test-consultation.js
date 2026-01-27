const http = require('http');

// 测试创建咨询预约
const testCreateConsultation = () => {
  const consultationData = {
    name: '测试用户',
    phone: '13800138000',
    templeId: 1,
    email: 'test@example.com',
    message: '我想咨询南华寺的行程安排'
  };

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/v1/consultations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(consultationData))
    }
  };

  const req = http.request(options, (res) => {
    console.log(`创建咨询预约状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('创建咨询预约响应:');
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

  req.write(JSON.stringify(consultationData));
  req.end();
};

// 测试获取咨询预约列表
const testGetConsultations = () => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/v1/consultations',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`获取咨询预约列表状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('获取咨询预约列表响应:');
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

// 运行测试
console.log('开始测试咨询预约API...');
console.log('=' * 50);

// 先创建咨询预约
testCreateConsultation();

// 等待2秒后获取咨询预约列表
setTimeout(() => {
  console.log('\n' + '=' * 50);
  console.log('测试获取咨询预约列表:');
  testGetConsultations();
}, 2000);