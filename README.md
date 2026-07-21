# 幸福渠数字孪生

幸福渠灌区数字孪生管理系统，基于 Vue 3 + TypeScript + Vite 构建，集成 ECharts 数据可视化与视频监控，实现灌区水资源调度与防汛决策的数字化管理。

## 功能模块

- **灌区概览** — 灌区整体运行态势总览
- **态势感知** — 雨水情、农情、工情实时监测
- **调水决策** — 配水计划、调度执行、预报预警、情景推演
- **防汛决策** — 汛情总览、应急预案、预报预警、防洪推演

## 技术栈

- **框架**：Vue 3 + TypeScript + Vite 5
- **UI 组件**：Element Plus、UnoCSS、SCSS
- **数据可视化**：ECharts 5
- **视频播放**：xgplayer、hls.js、flv.js
- **HTTP 客户端**：Axios

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

开发服务器默认运行在 `http://localhost:5173`。

## 构建

```bash
pnpm build
```

构建产物输出到 `dist/` 目录。

## 部署

构建后将 `dist/` 目录部署至 Nginx 或类似 Web 服务器。由于使用 hash 路由模式，无需额外配置 URL 重写规则。
