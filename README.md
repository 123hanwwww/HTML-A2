# 库存管理应用 (Inventory Management App)

一个基于 Angular 17 开发的库存管理应用，整合了所有功能到主界面，提供直观的库存管理体验。

## 功能特点

- **库存管理**：添加、编辑、删除库存项目
- **搜索功能**：按名称或描述搜索库存项目
- **统计功能**：查看总项目数、总数量、总价值和最受欢迎的项目
- **现代化界面**：标签页布局，响应式设计，美观的视觉效果
- **实时更新**：操作后自动更新库存数据和统计信息

## 技术栈

- **前端框架**：Angular 17
- **编程语言**：TypeScript
- **样式**：CSS
- **数据管理**：Angular 服务 (InventoryService)

## 安装和运行

### 前提条件

- Node.js (v16.0 或更高版本)
- npm (v7.0 或更高版本)
- Angular CLI (v17.0 或更高版本)

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/123hanwwww/HTML-A2.git
   cd HTML-A2
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   ng serve
   ```

4. 打开浏览器访问
   ```
   http://localhost:4200
   ```

### 构建项目

```bash
ng build
```

构建产物将存储在 `dist/` 目录中。

## 项目结构

```
src/
├── app/
│   ├── app.component.ts        # 主组件，整合所有功能
│   ├── app.component.html      # 主组件模板
│   ├── app.component.css       # 主组件样式
│   ├── inventory.service.ts    # 库存管理服务
│   └── ...
├── assets/                     # 静态资源
├── index.html                  # 应用入口 HTML
└── styles.css                  # 全局样式
```

## 使用说明

### 库存管理
1. 在 "Inventory Management" 标签页中，您可以：
   - 填写表单添加新的库存项目
   - 点击 "Edit" 按钮编辑现有项目
   - 点击 "Delete" 按钮删除项目

### 搜索
1. 在 "Search" 标签页中，您可以：
   - 输入关键词搜索库存项目
   - 查看搜索结果

### 统计
1. 在 "Statistics" 标签页中，您可以：
   - 查看库存的统计信息
   - 查看最受欢迎的项目

## 许可证

MIT License

## 作者

- GitHub: [123hanwwww](https://github.com/123hanwwww)
- 邮箱: 3241657311@qq.com

## 致谢

- [Angular](https://angular.io/) - 前端框架
- [Angular CLI](https://github.com/angular/angular-cli) - 项目构建工具
