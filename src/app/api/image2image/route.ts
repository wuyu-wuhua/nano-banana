import { NextRequest, NextResponse } from 'next/server';
import { DASHSCOPE_CONFIG, ImageToImageParams, DashScopeResponse } from '../../../lib/dashscope';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const prompt = formData.get('prompt') as string;
    const strength = Number(formData.get('strength')) || 70;
    const style = formData.get('style') as string;
    const size = formData.get('size') as string;

    if (!file && !prompt) {
      return NextResponse.json(
        { error: '需要提供图片文件或描述' },
        { status: 400 }
      );
    }

    let imageBase64 = '';
    if (file) {
      // 将文件转换为base64
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      imageBase64 = Buffer.from(uint8Array).toString('base64');
    }

    // 构建DashScope API请求参数
    const apiParams: ImageToImageParams = {
      model: DASHSCOPE_CONFIG.MODELS.IMAGE_TO_IMAGE,
      input: {
        prompt: prompt.trim(),
        image: imageBase64,
        strength: strength / 100, // 转换为0-1范围
        style: style || 'realistic',
        size: size || '1024*1024'
      },
      parameters: {
        style: style || 'realistic',
        size: size || '1024*1024',
        strength: strength / 100,
        n: 1
      }
    };

    // 调用DashScope API
    const response = await fetch(`${DASHSCOPE_CONFIG.BASE_URL}/services/aigc/image2image/generation`, {
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
    console.error('图生图API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
