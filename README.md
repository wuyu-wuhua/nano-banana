# Nano Banana 🍌

一个基于 Next.js 14 的现代化 AI 图像生成应用，为用户提供高质量的 AI 绘图服务。

## 🌟 项目简介

Nano Banana 是一个专业的 AI 图像生成平台，集成了先进的 AI 绘图技术，支持多种艺术风格和尺寸规格。用户可以通过简单的文字描述，快速生成高质量的 AI 艺术作品。

## ✨ 主要功能

### 🎨 AI 图像生成
- **文生图**: 通过文字描述生成图像
- **多种风格**: 支持写实、动漫、油画、水彩、素描等风格
- **灵活尺寸**: 支持多种宽高比例 (1:1, 3:4, 4:3, 16:9, 9:16)
- **高质量输出**: 最高支持 1024×1024 分辨率

### 👥 用户系统
- **用户注册/登录**: 支持邮箱注册和登录
- **积分系统**: 每次生成消耗 10 积分
- **个人画廊**: 用户可以收藏和管理生成的图片
- **历史记录**: 查看生成历史和积分消耗记录

### 💳 支付系统
- **Stripe 集成**: 安全可靠的支付处理
- **多种套餐**: 灵活的积分充值选项
- **自动续费**: 支持订阅制服务

### 🌐 多语言支持
- **中文简体**: 完整的中文界面
- **英文**: 英文界面支持
- **国际化**: 基于 i18n 的多语言架构

## 🛠️ 技术架构

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5.x
- **样式**: Tailwind CSS 3.x
- **组件**: React 18
- **状态管理**: React Context + Zustand
- **图标**: Lucide React
- **UI 组件**: Shadcn UI + Radix UI

### 后端技术栈
- **API**: Next.js API Routes
- **数据库**: Supabase (PostgreSQL)
- **存储**: Supabase Storage
- **认证**: Supabase Auth
- **AI 服务**: 阿里云通义万相 (DashScope)
- **支付**: Stripe

### 部署和基础设施
- **部署**: Vercel / 自托管
- **环境变量**: 支持 .env 配置
- **数据库迁移**: 自动化的数据库结构管理
- **CDN**: 图片内容分发网络

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn 或 pnpm
- Supabase 账户
- 阿里云 DashScope API Key
- Stripe 账户 (可选)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd nano-banana
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量文件
# 添加必要的 API 密钥和配置
```

4. **数据库设置**
```bash
# 运行数据库迁移脚本
npm run db:migrate
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
nano-banana/
├── docs/                          # 项目文档
│   ├── AI_DRAW_README.md         # AI绘图功能说明
│   ├── NEW_USER_CREDITS_README.md # 新用户积分说明
│   ├── PAYMENT_SETUP.md          # 支付系统设置
│   ├── PROJECT_STATUS.md         # 项目状态说明
│   ├── SUPABASE_SETUP.md         # Supabase设置指南
│   └── SUPABASE_STORAGE_SETUP.md # 存储设置指南
├── public/                        # 静态资源
│   ├── images/                   # 示例图片
│   └── logo.png                  # 项目Logo
├── src/                          # 源代码
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API 路由
│   │   │   ├── auth/            # 认证相关API
│   │   │   ├── credits/         # 积分管理API
│   │   │   ├── draw/            # AI绘图API
│   │   │   └── payments/        # 支付相关API
│   │   ├── auth/                # 认证页面
│   │   ├── draw/                # AI绘图页面
│   │   ├── gallery/             # 画廊页面
│   │   ├── pricing/             # 定价页面
│   │   ├── profile/             # 用户资料页面
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 主页面
│   ├── components/               # React 组件
│   │   ├── auth/                # 认证相关组件
│   │   ├── ui/                  # 基础UI组件
│   │   ├── Header.tsx           # 头部导航
│   │   ├── Hero.tsx             # 英雄区域
│   │   ├── Gallery.tsx          # 图片画廊
│   │   ├── DrawPage.tsx         # AI绘图页面
│   │   └── ...                  # 其他组件
│   ├── contexts/                 # React Context
│   │   ├── auth-context.tsx     # 认证上下文
│   │   └── LanguageContext.tsx  # 语言上下文
│   ├── lib/                      # 工具库
│   │   ├── supabase/            # Supabase 客户端
│   │   ├── stripe.ts            # Stripe 配置
│   │   ├── dashscope.ts         # DashScope API
│   │   └── utils.ts             # 通用工具函数
│   └── types/                    # TypeScript 类型定义
├── .env.example                  # 环境变量模板
├── .gitignore                    # Git 忽略文件
├── next.config.js                # Next.js 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖配置
```

## 🔧 配置说明

### 环境变量
```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 阿里云 DashScope 配置
DASHSCOPE_API_KEY=your_dashscope_api_key

# Stripe 配置
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

# 应用配置
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 数据库配置
项目使用 Supabase 作为数据库，需要创建以下表：
- `nano_users`: 用户信息表
- `nano_user_images`: 用户图片表
- `nano_user_credits`: 用户积分表
- `nano_payments`: 支付记录表

## 📱 使用说明

### 用户注册和登录
1. 访问首页，点击"开始创作"或"登录"
2. 填写邮箱和密码进行注册
3. 验证邮箱后即可登录使用

### AI 图像生成
1. 登录后进入"创作"页面
2. 输入图像描述文字
3. 选择艺术风格和尺寸
4. 点击"生成"按钮
5. 等待生成完成后查看结果

### 积分管理
- 新用户注册后获得免费积分
- 每次生成图像消耗 10 积分
- 可通过充值获得更多积分

### 画廊管理
- 生成的图片自动保存到个人画廊
- 支持收藏和取消收藏
- 可以下载生成的图片

## 🚀 部署指南

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署完成

### 自托管部署
1. 构建生产版本：`npm run build`
2. 启动生产服务器：`npm start`
3. 配置反向代理 (Nginx/Apache)
4. 设置 SSL 证书

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **邮箱**: media@nanobananamodle.com
- **项目地址**: [GitHub Repository]
- **在线演示**: [Demo URL]

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 开源 Firebase 替代品
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [阿里云通义万相](https://help.aliyun.com/zh/dashscope/) - AI 图像生成服务
- [Stripe](https://stripe.com/) - 支付处理服务

---

**Nano Banana** - 让 AI 创作变得简单而有趣！🎨✨
