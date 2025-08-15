# Nano Banana

一个基于 Next.js 的 AI 图像生成应用。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件**: React 18
- **图标**: Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 主页面
│   └── globals.css     # 全局样式
└── components/         # React 组件
    ├── Header.tsx      # 头部导航
    ├── Hero.tsx        # 英雄区域
    ├── StatsSection.tsx # 统计区域
    ├── WhatSection.tsx # 功能介绍
    ├── WhySection.tsx  # 为什么选择我们
    ├── HowItWorks.tsx  # 工作原理
    ├── Gallery.tsx     # 图片画廊
    ├── TestimonialsSection.tsx # 用户评价
    ├── FAQSection.tsx  # 常见问题
    ├── CallToAction.tsx # 行动号召
    └── Footer.tsx      # 页脚
```

## 特性

- 🎨 AI 驱动的图像生成
- 📱 响应式设计
- ⚡ 快速加载
- 🔒 隐私保护
- 🎯 用户友好界面
- 🌟 现代化 UI/UX

## 开发说明

- 所有组件都使用 TypeScript
- 使用 Tailwind CSS 进行样式设计
- 遵循 Next.js 最佳实践
- 支持服务器端渲染 (SSR)
