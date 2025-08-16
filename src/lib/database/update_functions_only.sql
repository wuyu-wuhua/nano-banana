-- ========================================
-- Nano Banana 项目 - 仅更新函数脚本
-- 请在Supabase SQL编辑器中运行此脚本
-- 这个脚本只更新函数，不会创建已存在的表
-- ========================================

-- 1. 更新赠送新用户积分的函数（移除时间限制）
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

-- 2. 创建专门为Google OAuth用户提供积分的函数
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
      '新用户赠送积分',
      v_debug_info
    );
    
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- 3. 验证函数是否创建成功
SELECT 
  '函数更新完成！' as status,
  routine_name as function_name,
  routine_type as function_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('nano_gift_new_user_credits', 'nano_gift_google_oauth_user')
ORDER BY routine_name;
