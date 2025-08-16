"use client";

import React from 'react';
import { DotPattern } from '~/components/magicui/dot-pattern';

export default function TestDotsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-screen">
        <DotPattern
          width={50}
          height={50}
          cr={3}
          glow={false}
          className="text-gray-300 z-0"
        />
        
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold text-black mb-4">点状图案测试</h1>
          <p className="text-lg text-gray-700">
            如果你能看到这个页面，说明DotPattern组件已经加载。
            背景应该显示点状图案。
          </p>
          
          <div className="mt-8 p-6 bg-white/80 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">测试信息</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 点的大小: 3px</li>
              <li>• 点间距: 50px x 50px</li>
              <li>• 点颜色: 浅灰色</li>
              <li>• 透明度: 60%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
