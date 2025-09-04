import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端（服务端）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 图片处理消耗的积分数量
const PROCESSING_CREDITS_COST = 15;

// 辅助函数：检查用户积分是否足够
async function checkUserCredits(userId: string): Promise<{ hasEnough: boolean; currentCredits: number }> {
  try {
    const { data, error } = await supabase
      .from('gemini_2_5_flash_user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('检查用户积分失败:', error);
      return { hasEnough: false, currentCredits: 0 };
    }

    const currentCredits = data?.balance || 0;
    return { 
      hasEnough: currentCredits >= PROCESSING_CREDITS_COST, 
      currentCredits 
    };
  } catch (error) {
    console.error('检查用户积分失败:', error);
    return { hasEnough: false, currentCredits: 0 };
  }
}

// 辅助函数：消费用户积分
async function consumeUserCredits(userId: string, userEmail: string): Promise<boolean> {
  try {
    // 获取当前积分
    const { data: currentCredits, error: selectError } = await supabase
      .from('gemini_2_5_flash_user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (selectError) {
      console.error('获取用户积分失败:', selectError);
      return false;
    }

    const newBalance = (currentCredits?.balance || 0) - PROCESSING_CREDITS_COST;
    
    // 更新积分余额
    const { error: updateError } = await supabase
      .from('gemini_2_5_flash_user_credits')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('更新用户积分失败:', updateError);
      return false;
    }

    // 记录积分交易
    const { error: transactionError } = await supabase
      .from('gemini_2_5_flash_credit_transactions')
      .insert({
        user_id: userId,
        user_email: userEmail,
        amount: -PROCESSING_CREDITS_COST, // 负数表示消费
        type: 'consume',
        description: '图片处理消费',
        reference_id: `img_${Date.now()}`,
        metadata: { processing_type: 'image_enhancement' }
      });

    if (transactionError) {
      console.error('记录积分交易失败:', transactionError);
      // 即使记录失败，积分已经扣除，所以这里不返回false
    }

    console.log(`💸 用户 ${userId} 消费 ${PROCESSING_CREDITS_COST} 积分进行图片处理`);
    return true;
  } catch (error) {
    console.error('消费用户积分失败:', error);
    return false;
  }
}

// 辅助函数：记录图片处理日志
async function logImageProcessing(
  userId: string, 
  userEmail: string, 
  imageName: string, 
  originalSize: number,
  processedSize: number,
  processingTimeMs: number,
  status: string = 'completed',
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    const { error } = await supabase
      .from('gemini_2_5_flash_image_processing_logs')
      .insert({
        user_id: userId,
        user_email: userEmail,
        image_name: imageName,
        processing_type: 'enhancement',
        credits_consumed: PROCESSING_CREDITS_COST,
        original_size: originalSize,
        processed_size: processedSize,
        processing_time_ms: processingTimeMs,
        status: status,
        metadata: {
          ...metadata,
          processing_timestamp: new Date().toISOString()
        }
      });

    if (error) {
      console.error('记录图片处理日志失败:', error);
    } else {
      console.log(`📝 已记录图片处理日志: 用户 ${userId}, 图片 ${imageName}`);
    }
  } catch (error) {
    console.error('记录图片处理日志失败:', error);
  }
}

// 辅助函数：将base64图片上传到Supabase存储
async function uploadImageToSupabase(base64Data: string, fileName: string): Promise<string> {
  try {
    // 移除data:image/...;base64,前缀
    const base64WithoutPrefix = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // 转换为Buffer
    const buffer = Buffer.from(base64WithoutPrefix, 'base64');
    
    // 生成唯一文件名（移除中文字符，添加扩展名）
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop() || 'jpg';
    const uniqueFileName = `${timestamp}_processed.${fileExtension}`;
    
    // 上传到Supabase存储
    const { error } = await supabase.storage
      .from('images')
      .upload(uniqueFileName, buffer, {
        contentType: 'image/jpeg',
        cacheControl: '3600'
      });
    
    if (error) {
      throw new Error(`Supabase上传失败: ${error.message}`);
    }
    
    // 获取公共URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(uniqueFileName);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('上传图片到Supabase失败:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let userId: string | null = null;
  let userEmail: string | null = null;
  
  try {
    console.log('API路由被调用');
    
    // 获取用户认证信息
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '缺少用户认证信息' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // 验证用户token并获取用户信息
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: '用户认证失败' },
        { status: 401 }
      );
    }

    userId = user.id;
    userEmail = user.email || '';

    // 检查用户积分是否足够
    const { hasEnough, currentCredits } = await checkUserCredits(userId);
    if (!hasEnough) {
      return NextResponse.json(
        { 
          error: '积分不足', 
          currentCredits,
          requiredCredits: PROCESSING_CREDITS_COST,
          message: `当前积分: ${currentCredits}, 需要积分: ${PROCESSING_CREDITS_COST}`
        },
        { status: 402 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const description = formData.get('description') as string;

    console.log('接收到的数据:', { 
      hasImage: !!imageFile, 
      imageName: imageFile?.name,
      description: description,
      userId,
      userEmail
    });

    if (!imageFile) {
      console.log('没有上传图片文件');
      return NextResponse.json(
        { error: '没有上传图片文件' },
        { status: 400 }
      );
    }

    // 记录原始图片大小
    const originalSize = imageFile.size;

    // 将图片转换为 base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 调用 OpenRouter API
    console.log('开始调用 OpenRouter API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('OpenRouter API 调用超时，取消请求');
      controller.abort();
    }, 120000); // 2分钟超时
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || 'your_api_key_here'}`,
        "HTTP-Referer": process.env.SITE_URL || 'http://localhost:3000',
        "X-Title": process.env.SITE_NAME || 'gemini-2.5-flash-image-preview',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash-image-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": description || "请美化这张图片，让它更加美观和吸引人。重要：请直接返回处理后的图片，不要返回任何文字描述，只返回图片。"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        "modalities": ["image", "text"],
        "stream": false
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log('OpenRouter API 调用完成，状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API 错误响应:', errorText);
      throw new Error(`OpenRouter API 请求失败: ${response.status} - ${response.statusText}. 详情: ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenRouter API 响应:', data);
    
    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message;
      console.log('Message 对象:', message);
      console.log('Content 类型:', typeof message.content);
      console.log('Content 内容:', message.content);
      console.log('Images 数组:', message.images);
      
      // 首先检查 images 数组（Nana banana 的图片在这里）
      if (message.images && Array.isArray(message.images) && message.images.length > 0) {
        console.log('找到 images 数组，长度:', message.images.length);
        
        const imageItem = message.images[0];
        console.log('第一个图片项:', imageItem);
        
        if (imageItem.type === 'image_url' && imageItem.image_url && imageItem.image_url.url) {
          console.log('找到图片URL:', imageItem.image_url.url);
          
          try {
            // 将图片上传到Supabase存储
            const imageUrl = await uploadImageToSupabase(
              imageItem.image_url.url, 
              `processed_${imageFile.name}`
            );
            
            console.log('图片已上传到Supabase:', imageUrl);
            
            // 计算处理时间
            const processingTime = Date.now() - startTime;
            
            // 消费用户积分
            const creditsConsumed = await consumeUserCredits(userId!, userEmail!);
            if (!creditsConsumed) {
              console.error('消费积分失败，但图片处理成功');
            }
            
            // 记录图片处理日志
            await logImageProcessing(
              userId!,
              userEmail!,
              imageFile.name,
              originalSize,
              imageFile.size, // 这里可能需要获取处理后图片的实际大小
              processingTime,
              'completed',
              {
                processed_image_url: imageUrl,
                description: description,
                model: 'google/nana-banana-2.5-flash-image-preview'
              }
            );
            
            return NextResponse.json({
              success: true,
              processedImage: imageUrl,
              creditsConsumed: PROCESSING_CREDITS_COST,
              processingTime: processingTime
            });
          } catch (uploadError) {
            console.error('上传图片失败:', uploadError);
            
            // 记录失败日志
            if (userId && userEmail) {
              await logImageProcessing(
                userId!,
                userEmail!,
                imageFile.name,
                originalSize,
                0,
                Date.now() - startTime,
                'failed',
                {
                  error: uploadError instanceof Error ? uploadError.message : '未知错误',
                  description: description
                }
              );
            }
            
            throw new Error(`图片上传失败: ${uploadError instanceof Error ? uploadError.message : '未知错误'}`);
          }
        }
      }
      
      const content = message.content;
      
      // 检查返回的内容类型
      if (Array.isArray(content)) {
        console.log('Content 是数组，长度:', content.length);
        content.forEach((item, index) => {
          console.log(`Content[${index}]:`, item);
        });
        
        // 查找图片内容
        const imageContent = content.find(item => item.type === 'image_url');
        if (imageContent && imageContent.image_url) {
          console.log('找到图片内容:', imageContent);
          
          try {
            // 将图片上传到Supabase存储
            const imageUrl = await uploadImageToSupabase(
              imageContent.image_url.url, 
              `processed_${imageFile.name}`
            );
            
            console.log('图片已上传到Supabase:', imageUrl);
            
            // 计算处理时间
            const processingTime = Date.now() - startTime;
            
            // 消费用户积分
            const creditsConsumed = await consumeUserCredits(userId!, userEmail!);
            if (!creditsConsumed) {
              console.error('消费积分失败，但图片处理成功');
            }
            
            // 记录图片处理日志
            await logImageProcessing(
              userId!,
              userEmail!,
              imageFile.name,
              originalSize,
              imageFile.size,
              processingTime,
              'completed',
              {
                processed_image_url: imageUrl,
                description: description,
                model: 'google/nana-banana-2.5-flash-image-preview'
              }
            );
            
            return NextResponse.json({
              success: true,
              processedImage: imageUrl,
              creditsConsumed: PROCESSING_CREDITS_COST,
              processingTime: processingTime
            });
          } catch (uploadError) {
            console.error('上传图片失败:', uploadError);
            
            // 记录失败日志
            if (userId && userEmail) {
              await logImageProcessing(
                userId!,
                userEmail!,
                imageFile.name,
                originalSize,
                0,
                Date.now() - startTime,
                'failed',
                {
                  error: uploadError instanceof Error ? uploadError.message : '未知错误',
                  description: description
                }
              );
            }
            
            throw new Error(`图片上传失败: ${uploadError instanceof Error ? uploadError.message : '未知错误'}`);
          }
        }
      } else if (typeof content === 'string') {
        console.log('Content 是字符串，长度:', content.length);
        // 如果是字符串，可能是图片URL或base64
        if (content.startsWith('data:image/')) {
          try {
            // 将base64图片上传到Supabase存储
            const imageUrl = await uploadImageToSupabase(
              content, 
              `processed_${imageFile.name}`
            );
            
            console.log('base64图片已上传到Supabase:', imageUrl);
            
            // 计算处理时间
            const processingTime = Date.now() - startTime;
            
            // 消费用户积分
            const creditsConsumed = await consumeUserCredits(userId!, userEmail!);
            if (!creditsConsumed) {
              console.error('消费积分失败，但图片处理成功');
            }
            
            // 记录图片处理日志
            await logImageProcessing(
              userId!,
              userEmail!,
              imageFile.name,
              originalSize,
              imageFile.size,
              processingTime,
              'completed',
              {
                processed_image_url: imageUrl,
                description: description,
                model: 'google/nana-banana-2.5-flash-image-preview'
              }
            );
            
            return NextResponse.json({
              success: true,
              processedImage: imageUrl,
              creditsConsumed: PROCESSING_CREDITS_COST,
              processingTime: processingTime
            });
          } catch (uploadError) {
            console.error('上传base64图片失败:', uploadError);
            
            // 记录失败日志
            if (userId && userEmail) {
              await logImageProcessing(
                userId!,
                userEmail!,
                imageFile.name,
                originalSize,
                0,
                Date.now() - startTime,
                'failed',
                {
                  error: uploadError instanceof Error ? uploadError.message : '未知错误',
                  description: description
                }
              );
            }
            
            throw new Error(`图片上传失败: ${uploadError instanceof Error ? uploadError.message : '未知错误'}`);
          }
        } else if (content.startsWith('http')) {
          // 如果是HTTP链接，直接返回
          const processingTime = Date.now() - startTime;
          
          // 消费用户积分
          const creditsConsumed = await consumeUserCredits(userId!, userEmail!);
          if (!creditsConsumed) {
            console.error('消费积分失败，但图片处理成功');
          }
          
          // 记录图片处理日志
          await logImageProcessing(
            userId!,
            userEmail!,
            imageFile.name,
            originalSize,
            imageFile.size,
            processingTime,
            'completed',
            {
              processed_image_url: content,
              description: description,
              model: 'google/nana-banana-2.5-flash-image-preview'
            }
          );
          
          return NextResponse.json({
            success: true,
            processedImage: content,
            creditsConsumed: PROCESSING_CREDITS_COST,
            processingTime: processingTime
          });
        }
      }
      
      // 如果没有找到图片，检查是否有文本内容
      if (typeof content === 'string' && content.trim()) {
        console.log('API返回了文本内容，但没有图片');
        
        // 记录失败日志
        if (userId && userEmail) {
          await logImageProcessing(
            userId!,
            userEmail!,
            imageFile.name,
            originalSize,
            0,
            Date.now() - startTime,
            'failed',
            {
              error: 'API只返回了文字描述，没有生成图片',
              description: description,
              textResponse: content
            }
          );
        }
        
        return NextResponse.json({
          success: false,
          error: 'Nana banana只返回了文字描述，没有生成图片。请尝试重新提交或使用不同的描述。',
          textResponse: content
        });
      }
      
      console.log('没有找到任何内容，抛出错误');
      throw new Error('API没有返回任何内容');
    } else {
      throw new Error('OpenRouter API 响应格式错误：没有找到 choices');
    }
  } catch (error) {
    console.error('处理图片时发生错误:', error);
    
    // 记录失败日志
    if (userId && userEmail) {
      const processingTime = Date.now() - startTime;
      await logImageProcessing(
        userId!,
        userEmail!,
        'unknown',
        0,
        0,
        processingTime,
        'failed',
        {
          error: error instanceof Error ? error.message : '未知错误'
        }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : '处理图片时发生未知错误' 
      },
      { status: 500 }
    );
  }
}
