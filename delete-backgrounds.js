const fs = require('fs');
const path = require('path');

// 删除后端合成服务使用的背景图
const deleteBackendBackgrounds = () => {
  console.log('开始删除后端背景图...');
  const backendAssetsDir = path.join(__dirname, 'cyber-buddha-blessing', 'backend', 'assets');
  const backgroundFiles = [
    'cyber-buddha.png',
    'buddha-background.png',
    'buddha-background-new.png'
  ];

  backgroundFiles.forEach(file => {
    const filePath = path.join(backendAssetsDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log('删除成功:', file);
      } catch (error) {
        console.error('删除失败:', file, '(', error.message, ')');
      }
    } else {
      console.log('文件不存在:', file);
    }
  });
};

// 删除前端公共目录中的背景图
const deleteFrontendBackgrounds = () => {
  console.log('\n开始删除前端背景图...');
  const frontendPublicDir = path.join(__dirname, 'cyber-buddha-blessing', 'public');
  const backgroundFiles = [
    'buddha-background.png',
    'buddha-new.png'
  ];

  backgroundFiles.forEach(file => {
    const filePath = path.join(frontendPublicDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log('删除成功:', file);
      } catch (error) {
        console.error('删除失败:', file, '(', error.message, ')');
      }
    } else {
      console.log('文件不存在:', file);
    }
  });
};

// 删除临时创建的背景图文件
const deleteTempBackgrounds = () => {
  console.log('\n开始删除临时背景图...');
  const tempFiles = [
    'new-cyber-buddha.png'
  ];

  tempFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log('删除成功:', file);
      } catch (error) {
        console.error('删除失败:', file, '(', error.message, ')');
      }
    } else {
      console.log('文件不存在:', file);
    }
  });
};

// 执行删除操作
console.log('=== 删除项目中的赛博佛祖背景图 ===');
deleteBackendBackgrounds();
deleteFrontendBackgrounds();
deleteTempBackgrounds();
console.log('\n=== 删除操作完成 ===');
