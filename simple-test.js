const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 简单测试脚本，使用curl命令测试服务
function testServices() {
  console.log('开始简单测试服务状态...');
  
  // 测试前端服务
  console.log('\n1. 测试前端服务 (http://localhost:3000):');
  exec('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', (error, stdout, stderr) => {
    if (error) {
      console.error(`✗ 前端服务测试失败: ${error.message}`);
    } else if (stderr) {
      console.error(`✗ 前端服务测试 stderr: ${stderr}`);
    } else {
      if (stdout.trim() === '200') {
        console.log('✓ 前端服务可正常访问，状态码: 200');
      } else {
        console.error(`✗ 前端服务返回状态码: ${stdout.trim()}`);
      }
    }
    
    // 测试后端服务
    console.log('\n2. 测试后端服务 (http://localhost:5000/api/test-connection):');
    exec('curl -s http://localhost:5000/api/test-connection', (error, stdout, stderr) => {
      if (error) {
        console.error(`✗ 后端服务测试失败: ${error.message}`);
      } else if (stderr) {
        console.error(`✗ 后端服务测试 stderr: ${stderr}`);
      } else {
        try {
          const data = JSON.parse(stdout);
          if (data.status === 'success') {
            console.log('✓ 后端服务可正常访问');
            console.log(`   响应: ${JSON.stringify(data)}`);
          } else {
            console.error(`✗ 后端服务返回错误: ${stdout}`);
          }
        } catch (parseError) {
          console.error(`✗ 后端服务返回无效JSON: ${stdout}`);
        }
      }
      
      // 测试后端图片资源访问
      console.log('\n3. 检查赛博佛祖背景图是否存在:');
      const backgroundPath = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'assets', 'cyber-buddha.png');
      if (fs.existsSync(backgroundPath)) {
        const stats = fs.statSync(backgroundPath);
        console.log('✓ 赛博佛祖背景图存在');
        console.log(`   路径: ${backgroundPath}`);
        console.log(`   大小: ${stats.size} 字节`);
        console.log(`   修改时间: ${stats.mtime}`);
      } else {
        console.error('✗ 赛博佛祖背景图不存在');
        console.error(`   期望路径: ${backgroundPath}`);
      }
      
      console.log('\n4. 检查前端public目录下的背景图:');
      const frontendBackgroundPath = path.join(__dirname, 'cyber-buddha-blessing', 'public', 'buddha-background.png');
      if (fs.existsSync(frontendBackgroundPath)) {
        const stats = fs.statSync(frontendBackgroundPath);
        console.log('✓ 前端背景图存在');
        console.log(`   路径: ${frontendBackgroundPath}`);
        console.log(`   大小: ${stats.size} 字节`);
      } else {
        console.error('✗ 前端背景图不存在');
      }
      
      console.log('\n测试完成！');
      console.log('\n服务状态总结:');
      console.log('-----------------');
      console.log('前端服务: http://localhost:3000');
      console.log('后端服务: http://localhost:5000');
      console.log('\n请在浏览器中访问 http://localhost:3000 来使用网页应用。');
    });
  });
}

// 运行测试
testServices();
