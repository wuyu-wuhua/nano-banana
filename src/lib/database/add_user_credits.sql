-- 创建添加用户积分的函数
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

-- 创建消费积分的函数
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

-- 创建获取用户积分的函数
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
