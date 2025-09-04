import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, image } = body;

    console.log('图生图请求参数:', { prompt, hasImage: !!image });

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API密钥未配置' }, { status: 500 });
    }

    // 图生图功能需要参考图片
    if (!image) {
      return NextResponse.json({ error: '请上传参考图片' }, { status: 400 });
    }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: '请输入描述文字' }, { status: 400 });
    }

    // 构建OpenRouter图生图请求体
    const requestBody: any = {
      model: "google/gemini-2.5-flash-image-preview:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `请根据参考图片和以下描述生成一张新的图片：Create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork. 重要：请直接返回生成的图片，不要返回任何文字描述，只返回图片。`
            },
            {
              type: "image_url",
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      modalities: ["image", "text"],
      stream: false
    };
    
    console.log('发送到OpenRouter的请求体:', JSON.stringify(requestBody, null, 2));
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('OpenRouter API 调用超时，取消请求');
      controller.abort();
    }, 120000); // 2分钟超时
    
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://nano-banana.vercel.app',
        'X-Title': 'Nano Banana AI',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
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
      
      // 首先检查 images 数组
      if (message.images && Array.isArray(message.images) && message.images.length > 0) {
        console.log('找到 images 数组，长度:', message.images.length);
        
        const imageItem = message.images[0];
        console.log('第一个图片项:', imageItem);
        
        if (imageItem.type === 'image_url' && imageItem.image_url && imageItem.image_url.url) {
          console.log('找到图片URL:', imageItem.image_url.url);
          
          return NextResponse.json({
            success: true,
            imageUrl: imageItem.image_url.url,
            usage: data.usage,
          });
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
          
          return NextResponse.json({
            success: true,
            imageUrl: imageContent.image_url.url,
            usage: data.usage,
          });
        }
      } else if (typeof content === 'string') {
        console.log('Content 是字符串，长度:', content.length);
        // 如果是字符串，可能是图片URL或base64
        if (content.startsWith('data:image/') || content.startsWith('http')) {
          return NextResponse.json({
            success: true,
            imageUrl: content,
            usage: data.usage,
          });
        }
      }
      
      // 如果没有找到图片，检查是否有文本内容
      if (typeof content === 'string' && content.trim()) {
        console.log('API返回了文本内容，但没有图片');
        
        return NextResponse.json({
          success: false,
          error: 'API只返回了文字描述，没有生成图片。请尝试重新提交或使用不同的描述。',
          textResponse: content
        });
      }
      
      console.log('没有找到任何内容，抛出错误');
      throw new Error('API没有返回任何内容');
    } else {
      throw new Error('OpenRouter API 响应格式错误：没有找到 choices');
    }

  } catch (error) {
    console.error('图生图错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}