const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建一个简单的HTML文件用于测试
const testHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试佛祖开光API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .test-container {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #45a049;
        }
        .result {
            margin-top: 20px;
            padding: 10px;
            background: white;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .error {
            color: red;
        }
        .success {
            color: green;
        }
    </style>
</head>
<body>
    <h1>测试佛祖开光API</h1>
    
    <div class="test-container">
        <h2>直接测试前端API路由</h2>
        <p>这将测试前端API路由是否能正确处理请求</p>
        <button onclick="testFrontendApi()">测试前端API路由</button>
        <div id="frontend-result" class="result"></div>
    </div>

    <div class="test-container">
        <h2>测试文件上传</h2>
        <input type="file" id="file-input" accept="image/*">
        <button onclick="testFileUpload()">上传测试图片</button>
        <div id="upload-result" class="result"></div>
    </div>

    <script>
        // 测试前端API路由
        async function testFrontendApi() {
            const resultDiv = document.getElementById('frontend-result');
            resultDiv.innerHTML = '<p>测试中...</p>';
            
            try {
                // 发送一个简单的POST请求到前端API路由
                const response = await fetch('http://localhost:3000/api/upload/synthesize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ test: 'data' })
                });
                
                const result = await response.json();
                resultDiv.innerHTML = `
                    <h3 class="${response.ok ? 'success' : 'error'}">
                        ${response.ok ? '成功' : '失败'} - HTTP ${response.status}
                    </h3>
                    <pre>${JSON.stringify(result, null, 2)}</pre>
                `;
            } catch (error) {
                resultDiv.innerHTML = `
                    <h3 class="error">请求失败</h3>
                    <p>${error.message}</p>
                `;
            }
        }

        // 测试文件上传
        async function testFileUpload() {
            const fileInput = document.getElementById('file-input');
            const resultDiv = document.getElementById('upload-result');
            
            if (!fileInput.files || fileInput.files.length === 0) {
                resultDiv.innerHTML = '<h3 class="error">请先选择一个文件</h3>';
                return;
            }
            
            resultDiv.innerHTML = '<p>上传中...</p>';
            
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', 'consecration');
            
            try {
                const response = await fetch('http://localhost:3000/api/upload/synthesize', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                resultDiv.innerHTML = `
                    <h3 class="${response.ok ? 'success' : 'error'}">
                        ${response.ok ? '上传成功' : '上传失败'} - HTTP ${response.status}
                    </h3>
                    <pre>${JSON.stringify(result, null, 2)}</pre>
                `;
            } catch (error) {
                resultDiv.innerHTML = `
                    <h3 class="error">上传失败</h3>
                    <p>${error.message}</p>
                `;
            }
        }
    </script>
</body>
</html>
