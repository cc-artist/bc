const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

// 设置要上传的图片路径
const imagePath = path.join(__dirname, '赛博佛祖背景图.png');

// 检查图片是否存在
if (!fs.existsSync(imagePath)) {
  console.error('图片文件不存在:', imagePath);
  process.exit(1);
}

// 创建FormData对象
const formData = new FormData();
formData.append('image', fs.createReadStream(imagePath));
formData.append('type', 'consecration');

// 设置请求头
const headers = {
  ...formData.getHeaders(),
};

// 发送POST请求
axios.post('http://localhost:5000/api/upload/synthesize', formData, { headers })
  .then(response => {
    console.log('Status Code:', response.status);
    console.log('Response:', response.data);
    
    // 如果请求成功，我们可以查看合成后的图片
    if (response.status === 200) {
      console.log('\n合成图片URL:', response.data.imageUrl);
      console.log('完整URL:', response.data.fullUrl);
    }
  })
  .catch(error => {
    console.error('请求失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  });
