1. **保存用户提供的新背景图**：将用户提供的赛博朋克风格佛祖图片保存为项目根目录的`赛博佛祖背景图.png`

2. **运行背景图上传脚本**：执行`upload-background.js`脚本，该脚本会将新背景图分发到以下位置：

   * 后端assets目录：`cyber-buddha-blessing/backend/assets/cyber-buddha.png`

   * 前端public目录：`cyber-buddha-blessing/public/buddha-background.png`和`buddha-new.png`

   * 项目根assets目录：`cyber-buddha-blessing/assets/buddha-background.png`

3. **验证背景图替换**：检查各目标位置的背景图是否已更新，确保合成服务使用的是新背景图

4. **重启服务（如必要）**：如果背景图替换后服务未自动加载新图片，可能需要重启前后端服务

5. **测试合成功能**：验证合成结果是否正确使用了新的赛博佛祖背景图

