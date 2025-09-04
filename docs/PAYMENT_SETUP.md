# 支付系统配置指南

## 环境变量配置

在项目根目录创建 `.env.local` 文件，添加以下配置：

```bash
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe配置
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# DashScope API配置
DASHSCOPE_API_KEY=your_dashscope_api_key_here
```

## 安装依赖

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

## 数据库设置

### 重要：使用nano_前缀避免表名冲突

由于你的项目与其他项目共用一个Supabase数据库，所有表名都使用了`nano_`前缀来避免冲突。

1. 在Supabase SQL编辑器中运行 `src/lib/database/init_nano_database.sql` 脚本
2. 这个脚本会创建以下表：
   - `nano_credit_plans` - 积分套餐表
   - `nano_user_credits` - 用户积分表
   - `nano_credit_transactions` - 积分交易记录表
   - `nano_stripe_payment_intents` - Stripe支付意图表
   - `nano_payment_history` - 支付历史表

3. 同时会创建必要的函数：
   - `nano_add_user_credits` - 添加积分
   - `nano_consume_user_credits` - 消费积分
   - `nano_get_user_credits` - 查询积分

4. 自动设置行级安全策略(RLS)，确保数据安全

## Stripe配置

1. 在 [Stripe Dashboard](https://dashboard.stripe.com/) 创建账户
2. 获取API密钥（测试环境使用 `pk_test_` 和 `sk_test_` 开头的密钥）
3. 配置Webhook端点：`https://yourdomain.com/api/payments/webhook`
4. 设置Webhook事件：`payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`

## 功能说明

### 支付流程
1. 用户选择套餐并点击"立即购买"
2. 系统创建Stripe支付意图
3. 用户输入信用卡信息并完成支付
4. Stripe webhook通知系统支付状态
5. 系统确认支付成功后为用户添加积分

### 数据库表结构
- `nano_credit_plans`: 积分套餐表（基础、进阶、专业套餐）
- `nano_user_credits`: 用户积分表（每个用户唯一）
- `nano_credit_transactions`: 积分交易记录表（充值、消费、退款等）
- `nano_stripe_payment_intents`: Stripe支付意图表（支付状态跟踪）
- `nano_payment_history`: 支付历史表（完整的支付记录）

### API端点
- `POST /api/payments/create-payment-intent`: 创建支付意图
- `POST /api/payments/confirm`: 确认支付
- `POST /api/payments/webhook`: Stripe webhook处理

## 安全特性

1. **行级安全策略(RLS)**: 用户只能访问自己的数据
2. **函数级安全**: 所有数据库函数都使用`SECURITY DEFINER`
3. **Webhook验证**: Stripe webhook签名验证
4. **用户身份验证**: 所有API都需要用户登录

## 测试数据

脚本会自动插入三个默认套餐：
- 基础套餐：500积分，$6.90
- 进阶套餐：1000积分，$9.90（最受欢迎）
- 专业套餐：3000积分，$19.90

## 注意事项

1. 永远不要在前端暴露 `STRIPE_SECRET_KEY`
2. 始终验证webhook签名
3. 在生产环境中使用HTTPS
4. 定期更新Stripe API版本
5. 监控支付失败和异常情况
6. 所有表名都使用`nano_`前缀，避免与其他项目冲突
