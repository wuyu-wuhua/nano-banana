// DashScope API 配置
export const DASHSCOPE_CONFIG = {
  API_KEY: 'sk-3cb6d446b035484ea0b5ebaf56837bb2', // 直接使用API密钥
  BASE_URL: 'https://dashscope.aliyuncs.com/api/v1',
  MODELS: {
    TEXT_TO_IMAGE: 'wanx-v1',
    IMAGE_TO_IMAGE: 'wanx-v1'
  }
};

// 文生图请求参数接口
export interface TextToImageParams {
  model: string;
  input: {
    prompt: string;
    style?: string;
    size?: string;
  };
  parameters?: {
    style?: string;
    size?: string;
    n?: number;
    seed?: number;
  };
}

// 图生图请求参数接口
export interface ImageToImageParams {
  model: string;
  input: {
    prompt: string;
    image: string; // base64 encoded image
    strength?: number;
    style?: string;
    size?: string;
  };
  parameters?: {
    style?: string;
    size?: string;
    strength?: number;
    n?: number;
    seed?: number;
  };
}

// DashScope API 响应接口
export interface DashScopeResponse {
  status_code: number;
  request_id: string;
  output: {
    images: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  usage: {
    image_count: number;
  };
}

// 风格映射
export const STYLE_MAP = {
  realistic: '写实风格',
  anime: '动漫风格',
  oil_painting: '油画风格',
  watercolor: '水彩风格',
  sketch: '素描风格',
  illustration: '插画风格'
};

// 尺寸映射
export const SIZE_MAP = {
  '1:1': '1024*1024',
  '3:4': '768*1152',
  '4:3': '1280*720',
  '16:9': '1280*720',
  '9:16': '720*1280'
};
