'use client';

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { X, CreditCard, Shield, Zap, Check, Star } from 'lucide-react';
import { CheckoutFormProps } from '~/types/payment';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export function CheckoutForm({ plan, onSuccess, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // 创建支付意图
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: plan.price,
            planId: plan.id,
            planName: plan.name,
          }),
        });

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        setError('创建支付意图失败');
      }
    };

    createPaymentIntent();
  }, [plan]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || '提交失败');
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (confirmError) {
      setError(confirmError.message || '支付失败');
      setLoading(false);
    } else {
      // 支付成功，调用确认API
      try {
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: clientSecret.split('_secret_')[0],
          }),
        });

        const data = await response.json();
        if (data.success) {
          onSuccess(data.credits);
        } else {
          setError(data.error || '确认支付失败');
        }
      } catch (err) {
        setError('确认支付失败');
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white border-0 shadow-2xl">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    购买{plan.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    每次AI生成消耗10积分
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* 套餐详情 */}
            <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl p-4 mb-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">{plan.credits} 积分</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${plan.price}</div>
                  <div className="text-sm text-gray-600">一次性</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>

            {/* 支付表单 */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  信用卡信息
                </label>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <CardElement options={cardElementOptions} />
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  您的支付信息受到256位SSL加密保护
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* 支付摘要 */}
              <div className="bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold">{plan.credits}</div>
                    <div className="text-sm opacity-90">积分</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold">{Math.floor(plan.credits / 10)}</div>
                    <div className="text-sm opacity-90">次生成</div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading || !stripe}
                  className="w-full bg-white text-green-600 hover:bg-gray-50 font-semibold py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      处理中...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      立即支付 ${plan.price}
                    </div>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
