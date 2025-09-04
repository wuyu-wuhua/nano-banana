"use client";

import React, { useEffect, useRef, useState } from 'react';

interface DotPatternProps {
  width?: number;
  height?: number;
  cr?: number;
  glow?: boolean;
  className?: string;
}

export function DotPattern({
  width = 50,
  height = 50,
  cr = 3,
  glow = false,
  className = ''
}: DotPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 计算需要多少个点来覆盖整个容器
  const dotsPerRow = Math.ceil(dimensions.width / width) + 2; // 多添加2个确保覆盖
  const dotsPerCol = Math.ceil(dimensions.height / height) + 2;
  
  const dots = [];
  for (let row = 0; row < dotsPerCol; row++) {
    for (let col = 0; col < dotsPerRow; col++) {
      dots.push({
        x: col * width + width / 2,
        y: row * height + height / 2
      });
    }
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill="currentColor"
            className="text-gray-300"
          />
        ))}
      </svg>
    </div>
  );
}
