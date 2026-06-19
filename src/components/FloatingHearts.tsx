/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number; // percentage left
  size: number; // size in px
  delay: number; // animation delay in s
  duration: number; // animation duration in s
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate 25 floating hearts with randomized properties
    const newHearts: Heart[] = Array.from({ length: 25 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100, // 0 to 100%
      size: Math.random() * 24 + 10, // 10px to 34px
      delay: Math.random() * 6, // 0s to 6s delay
      duration: Math.random() * 8 + 6, // 6s to 14s duration
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: `${heart.x}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
            fill: 'currentColor',
            color: heart.id % 2 === 0 ? '#fb7185' : '#fda4af', // pink-400 and pink-300
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
