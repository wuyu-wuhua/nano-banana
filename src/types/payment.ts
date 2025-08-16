// 支付套餐类型定义
export interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
  stripe_price_id?: string;
}

// 支付表单组件Props
export interface CheckoutFormProps {
  plan: CreditPlan;
  onSuccess: (credits: number) => void;
  onClose: () => void;
}

// 支付意图创建参数
export interface CreatePaymentIntentParams {
  amount: number;
  planId: string;
  planName: string;
}

// 支付确认参数
export interface ConfirmPaymentParams {
  paymentIntentId: string;
}

// 积分交易记录
export interface CreditTransaction {
  id: number;
  user_id: string;
  amount: number;
  type: 'PURCHASE' | 'CONSUME' | 'REFUND' | 'BONUS';
  description: string;
  reference_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// 用户积分信息
export interface UserCredits {
  id: number;
  user_id: string;
  credits: number;
  created_at: string;
  updated_at: string;
}
