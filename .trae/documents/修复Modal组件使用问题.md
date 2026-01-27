1. 移除Modal组件内部重复的模态框结构，只保留核心内容
2. 修复closeModal函数未定义的问题
3. 统一使用CSS Modules或Tailwind CSS，保持样式一致性
4. 优化图片加载状态管理
5. 确保模态框正常显示和关闭

具体修改点：

* src/app/page.tsx：重构Modal组件的使用，移除内部重复的模态框结构

* 使用CSS Modules替代内联样式和Tailwind CSS

* 修复closeModal函数引用问题

预期效果：

* 模态框正常显示，没有双重背景和容器

* 图片加载状态正确显示

* 样式保持一致

* 模态框可以正常关闭

