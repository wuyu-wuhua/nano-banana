import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '~/lib/supabase/server';
import { stripe } from '~/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET 环境变量未设置');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }
    
    // 验证webhook签名
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook签名验证失败:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    const supabase = await createSupabaseServerClient();
    
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态
        const { error: updateError } = await supabase
          .from('nano_stripe_payment_intents')
          .update({ status: 'succeeded' })
          .eq('id', paymentIntent.id);
        
        if (updateError) {
          console.error('更新支付意图状态失败:', updateError);
        }
        
        console.log(`支付成功: ${paymentIntent.id}`);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态
        const { error: updateError } = await supabase
          .from('nano_stripe_payment_intents')
          .update({ status: 'failed' })
          .eq('id', paymentIntent.id);
        
        if (updateError) {
          console.error('更新支付意图状态失败:', updateError);
        }
        
        console.log(`支付失败: ${paymentIntent.id}`);
        break;
      }
      
      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态
        const { error: updateError } = await supabase
          .from('nano_stripe_payment_intents')
          .update({ status: 'canceled' })
          .eq('id', paymentIntent.id);
        
        if (updateError) {
          console.error('更新支付意图状态失败:', updateError);
        }
        
        console.log(`支付取消: ${paymentIntent.id}`);
        break;
      }
      
      default:
        console.log(`未处理的webhook事件类型: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook处理失败:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
