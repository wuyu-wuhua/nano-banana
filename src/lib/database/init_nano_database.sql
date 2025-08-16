-- ========================================
-- Nano Banana 项目数据库初始化脚本
-- 请在Supabase SQL编辑器中运行此脚本
-- ========================================

-- 1. 创建支付套餐表
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

-- 2. 创建用户积分表
CREATE TABLE IF NOT EXISTS nano_user_credits (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- 3. 创建积分交易记录表
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

-- 4. 创建Stripe支付意图表
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

-- 5. 创建支付历史表
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

-- 6. 插入默认套餐数据
INSERT INTO nano_credit_plans (name, credits, price, description, popular, stripe_price_id) VALUES
('基础套餐', 500, 6.90, '500积分，适合个人用户', false, NULL),
('进阶套餐', 1000, 9.90, '1000积分，最受欢迎的选择', true, NULL),
('专业套餐', 3000, 19.90, '3000积分，适合专业用户', false, NULL)
ON CONFLICT DO NOTHING;

-- 7. 创建索引
CREATE INDEX IF NOT EXISTS idx_nano_credit_transactions_user_id ON nano_credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_nano_credit_transactions_type ON nano_credit_transactions(type);
CREATE INDEX IF NOT EXISTS idx_nano_stripe_payment_intents_user_id ON nano_stripe_payment_intents(user_id);
CREATE INDEX IF NOT EXISTS idx_nano_payment_history_user_id ON nano_payment_history(user_id);

-- 8. 创建添加用户积分的函数
CREATE OR REPLACE FUNCTION nano_add_user_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_description TEXT,
  p_reference_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS TABLE(transaction_id INTEGER, new_balance INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_transaction_id INTEGER;
  v_new_balance INTEGER;
BEGIN
  -- 插入积分交易记录
  INSERT INTO nano_credit_transactions (
    user_id,
    amount,
    type,
    description,
    reference_id,
    metadata
  ) VALUES (
    p_user_id,
    p_amount,
    p_type,
    p_description,
    p_reference_id,
    p_metadata
  ) RETURNING id INTO v_transaction_id;

  -- 更新或插入用户积分
  INSERT INTO nano_user_credits (user_id, credits)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits = nano_user_credits.credits + p_amount,
    updated_at = CURRENT_TIMESTAMP
  RETURNING credits INTO v_new_balance;

  -- 返回交易ID和新余额
  RETURN QUERY SELECT v_transaction_id, v_new_balance;
END;
$$;

-- 9. 创建消费积分的函数
CREATE OR REPLACE FUNCTION nano_consume_user_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT,
  p_metadata JSONB DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, remaining_credits INTEGER, transaction_id INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_credits INTEGER;
  v_transaction_id INTEGER;
  v_remaining_credits INTEGER;
BEGIN
  -- 获取用户当前积分
  SELECT credits INTO v_current_credits
  FROM nano_user_credits
  WHERE user_id = p_user_id;

  -- 检查积分是否足够
  IF v_current_credits IS NULL OR v_current_credits < p_amount THEN
    RETURN QUERY SELECT false, 0, 0;
    RETURN;
  END IF;

  -- 插入消费记录（负数表示消费）
  INSERT INTO nano_credit_transactions (
    user_id,
    amount,
    type,
    description,
    metadata
  ) VALUES (
    p_user_id,
    -p_amount,
    'CONSUME',
    p_description,
    p_metadata
  ) RETURNING id INTO v_transaction_id;

  -- 更新用户积分
  UPDATE nano_user_credits
  SET 
    credits = credits - p_amount,
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = p_user_id
  RETURNING credits INTO v_remaining_credits;

  -- 返回成功状态和剩余积分
  RETURN QUERY SELECT true, v_remaining_credits, v_transaction_id;
END;
$$;

-- 10. 创建获取用户积分的函数
CREATE OR REPLACE FUNCTION nano_get_user_credits(p_user_id UUID)
RETURNS TABLE(credits INTEGER, last_updated TIMESTAMP)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(uc.credits, 0) as credits,
    COALESCE(uc.updated_at, CURRENT_TIMESTAMP) as last_updated
  FROM nano_user_credits uc
  WHERE uc.user_id = p_user_id;
END;
$$;

-- 11. 设置行级安全策略 (RLS)
ALTER TABLE nano_credit_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE nano_user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE nano_credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nano_stripe_payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE nano_payment_history ENABLE ROW LEVEL SECURITY;

-- 12. 创建策略：用户只能查看自己的积分和交易记录
CREATE POLICY "Users can view own credits" ON nano_user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON nano_credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payment intents" ON nano_stripe_payment_intents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payment history" ON nano_payment_history
  FOR SELECT USING (auth.uid() = user_id);

-- 13. 创建策略：允许插入支付意图和交易记录
CREATE POLICY "Users can insert payment intents" ON nano_stripe_payment_intents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert transactions" ON nano_credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert payment history" ON nano_payment_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 14. 创建策略：允许更新支付意图状态
CREATE POLICY "Users can update own payment intents" ON nano_stripe_payment_intents
  FOR UPDATE USING (auth.uid() = user_id);

-- 15. 允许更新积分
CREATE POLICY "Users can update own credits" ON nano_user_credits
  FOR UPDATE USING (auth.uid() = user_id);

-- 16. 创建赠送新用户积分的函数
CREATE OR REPLACE FUNCTION nano_gift_new_user_credits(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_created_at TIMESTAMP;
  v_credits_exist BOOLEAN;
  v_has_transactions BOOLEAN;
  v_is_new_user BOOLEAN;
  v_debug_info JSONB;
BEGIN
  -- 获取用户的注册时间
  SELECT created_at INTO v_user_created_at
  FROM auth.users
  WHERE id = p_user_id;
  
  -- 检查用户是否已经有积分记录
  SELECT EXISTS(
    SELECT 1 FROM nano_user_credits WHERE user_id = p_user_id
  ) INTO v_credits_exist;
  
  -- 检查用户是否已经有任何交易记录（包括消费、充值等）
  SELECT EXISTS(
    SELECT 1 FROM nano_credit_transactions WHERE user_id = p_user_id
  ) INTO v_has_transactions;
  
  -- 判断是否为新用户：移除时间限制，只要没有积分记录和交易记录就算新用户
  v_is_new_user := (
    NOT v_credits_exist AND
    NOT v_has_transactions
  );
  
  -- 记录调试信息
  v_debug_info := jsonb_build_object(
    'user_id', p_user_id,
    'user_created_at', v_user_created_at,
    'credits_exist', v_credits_exist,
    'has_transactions', v_has_transactions,
    'is_new_user', v_is_new_user,
    'current_time', CURRENT_TIMESTAMP,
    'time_diff_hours', CASE 
      WHEN v_user_created_at IS NOT NULL THEN 
        EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - v_user_created_at)) / 3600
      ELSE NULL
    END,
    'function', 'nano_gift_new_user_credits',
    'logic', 'No time limit - only checks credits and transactions'
  );
  
  -- 记录调试信息到日志
  RAISE NOTICE 'Debug info: %', v_debug_info;
  
  -- 只有真正的新用户才能获得赠送
  IF v_is_new_user THEN
    -- 插入用户积分记录
    INSERT INTO nano_user_credits (
      user_id,
      credits,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      50,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    );
    
    -- 插入赠送记录
    INSERT INTO nano_credit_transactions (
      user_id,
      amount,
      type,
      description,
      metadata
    ) VALUES (
      p_user_id,
      50,
      'GIFT',
      '新用户注册赠送积分',
      v_debug_info
    );
    
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- 17. 创建触发器函数，在新用户注册时自动赠送积分
CREATE OR REPLACE FUNCTION handle_new_user_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 只有新插入的用户才触发
  IF TG_OP = 'INSERT' THEN
    -- 调用赠送积分函数
    PERFORM nano_gift_new_user_credits(NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$;

-- 18. 创建触发器，监听auth.users表的新用户注册
CREATE TRIGGER trigger_new_user_registration
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_registration();

-- 19. 创建专门为Google OAuth用户提供积分的函数
CREATE OR REPLACE FUNCTION nano_gift_google_oauth_user(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_created_at TIMESTAMP;
  v_credits_exist BOOLEAN;
  v_has_transactions BOOLEAN;
  v_is_eligible BOOLEAN;
  v_debug_info JSONB;
BEGIN
  -- 获取用户的注册时间
  SELECT created_at INTO v_user_created_at
  FROM auth.users
  WHERE id = p_user_id;
  
  -- 检查用户是否已经有积分记录
  SELECT EXISTS(
    SELECT 1 FROM nano_user_credits WHERE user_id = p_user_id
  ) INTO v_credits_exist;
  
  -- 检查用户是否已经有任何交易记录
  SELECT EXISTS(
    SELECT 1 FROM nano_credit_transactions WHERE user_id = p_user_id
  ) INTO v_has_transactions;
  
  -- 为Google OAuth用户提供更宽松的条件：
  -- 1. 没有积分记录
  -- 2. 没有任何交易记录
  -- 3. 移除时间限制，只要满足上述两个条件就算新用户
  v_is_eligible := (
    NOT v_credits_exist AND
    NOT v_has_transactions
  );
  
  -- 记录调试信息
  v_debug_info := jsonb_build_object(
    'user_id', p_user_id,
    'user_created_at', v_user_created_at,
    'credits_exist', v_credits_exist,
    'has_transactions', v_has_transactions,
    'is_eligible', v_is_eligible,
    'current_time', CURRENT_TIMESTAMP,
    'time_diff_days', CASE 
      WHEN v_user_created_at IS NOT NULL THEN 
        EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - v_user_created_at)) / 86400
      ELSE NULL
    END,
    'function', 'nano_gift_google_oauth_user',
    'logic', 'No time limit - only checks credits and transactions'
  );
  
  -- 记录调试信息到日志
  RAISE NOTICE 'Google OAuth gift debug info: %', v_debug_info;
  
  -- 如果符合条件，赠送积分
  IF v_is_eligible THEN
    -- 插入用户积分记录
    INSERT INTO nano_user_credits (
      user_id,
      credits,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      50,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    );
    
    -- 插入赠送记录
    INSERT INTO nano_credit_transactions (
      user_id,
      amount,
      type,
      description,
      metadata
    ) VALUES (
      p_user_id,
      50,
      'GIFT',
      'Google OAuth新用户赠送积分',
      v_debug_info
    );
    
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- 完成提示
SELECT 'Nano Banana 数据库初始化完成！' as status;
