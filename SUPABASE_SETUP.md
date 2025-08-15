# Supabase 认证系统设置指南

## 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 注册或登录账户
3. 创建新项目
4. 等待项目初始化完成

## 2. 获取项目配置

在项目仪表板中：

1. 进入 **Settings** > **API**
2. 复制以下信息：
   - **Project URL** (例如: `https://your-project.supabase.co`)
   - **anon public** key

## 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# 其他配置
NODE_ENV=development
```

## 4. 配置认证设置

在 Supabase 仪表板中：

1. 进入 **Authentication** > **Settings**
2. 配置 **Site URL** 为你的应用域名
3. 在 **Redirect URLs** 中添加：
   - `http://localhost:3000/auth/callback` (开发环境)
   - `https://yourdomain.com/auth/callback` (生产环境)

## 5. 启用 OAuth 提供商 (可选)

### GitHub
1. 在 GitHub 中创建 OAuth App
2. 在 Supabase 中添加 GitHub 提供商
3. 配置 Client ID 和 Client Secret

### Google
1. 在 Google Cloud Console 创建 OAuth 2.0 客户端
2. 在 Supabase 中添加 Google 提供商
3. 配置 Client ID 和 Client Secret

## 6. 测试认证系统

1. 启动开发服务器：`npm run dev`
2. 访问 `/auth/sign-in` 测试登录
3. 访问 `/auth/sign-up` 测试注册

## 注意事项

- 确保 `.env.local` 文件已添加到 `.gitignore`
- 生产环境中使用 HTTPS
- 定期更新 Supabase 依赖包
- 监控认证日志和错误
