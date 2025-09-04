-- 支付套餐表
CREATE TABLE IF NOT EXISTS nano_credit_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  credits INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  popular BOOLEAN DEFAULT false,
  stripe_price_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户积分表
CREATE TABLE IF NOT EXISTS nano_user_credits (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- 积分交易记录表
CREATE TABLE IF NOT EXISTS nano_credit_transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  amount INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'PURCHASE', 'CONSUME', 'REFUND', 'BONUS'
  description TEXT,
  reference_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stripe支付意图表
CREATE TABLE IF NOT EXISTS nano_stripe_payment_intents (
  id VARCHAR(255) PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'usd',
  status VARCHAR(50) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 支付历史表
CREATE TABLE IF NOT EXISTS nano_payment_history (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id INTEGER NOT NULL,
  stripe_payment_intent_id VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认套餐数据
INSERT INTO nano_credit_plans (name, credits, price, description, popular, stripe_price_id) VALUES
('基础套餐', 500, 6.90, '500积分，适合个人用户', false, NULL),
('进阶套餐', 1000, 9.90, '1000积分，最受欢迎的选择', true, NULL),
('专业套餐', 3000, 19.90, '3000积分，适合专业用户', false, NULL)
ON CONFLICT DO NOTHING;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_nano_credit_transactions_user_id ON nano_credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_nano_credit_transactions_type ON nano_credit_transactions(type);
CREATE INDEX IF NOT EXISTS idx_nano_stripe_payment_intents_user_id ON nano_stripe_payment_intents(user_id);
CREATE INDEX IF NOT EXISTS idx_nano_payment_history_user_id ON nano_payment_history(user_id);
