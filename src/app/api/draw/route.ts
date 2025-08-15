import { NextRequest, NextResponse } from 'next/server';
import { DASHSCOPE_CONFIG, TextToImageParams, DashScopeResponse } from '../../../lib/dashscope';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, size } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: '提示词不能为空' },
        { status: 400 }
      );
    }

    // 构建DashScope API请求参数
    const apiParams: TextToImageParams = {
      model: DASHSCOPE_CONFIG.MODELS.TEXT_TO_IMAGE,
      input: {
        prompt: prompt.trim(),
        style: style || 'realistic',
        size: size || '1024*1024'
      },
      parameters: {
        style: style || 'realistic',
        size: size || '1024*1024',
        n: 1
      }
    };

    // 调用DashScope API
    const response = await fetch(`${DASHSCOPE_CONFIG.BASE_URL}/services/aigc/text2image/generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable' // 启用异步模式
      },
      body: JSON.stringify(apiParams)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DashScope API 错误:', errorData);
      return NextResponse.json(
        { error: `DashScope API 调用失败: ${response.status}` },
        { status: response.status }
      );
    }

    const data: DashScopeResponse = await response.json();

    if (data.status_code !== 200) {
      return NextResponse.json(
        { error: `生成失败: ${data.status_code}` },
        { status: 500 }
      );
    }

    // 检查是否有生成的图片
    if (!data.output?.images || data.output.images.length === 0) {
      return NextResponse.json(
        { error: '没有生成图片' },
        { status: 500 }
      );
    }

    const imageUrl = data.output.images[0].url;

    return NextResponse.json({
      success: true,
      imageUrl,
      requestId: data.request_id,
      usage: data.usage
    });

  } catch (error) {
    console.error('文生图API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
