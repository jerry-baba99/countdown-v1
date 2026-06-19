/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

// Classes for Rocket and Particle
class Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  distanceToTarget: number;
  distanceTraveled = 0;
  coordinates: [number, number][] = [];
  coordinateCount = 3;
  angle: number;
  speed: number;
  acceleration = 1.05;
  brightness: number;
  color: string;

  constructor(sx: number, sy: number, tx: number, ty: number, color: string) {
    this.x = sx;
    this.y = sy;
    this.startX = sx;
    this.startY = sy;
    this.targetX = tx;
    this.targetY = ty;
    this.color = color;

    // Calculate distance and angles
    const dx = tx - sx;
    const dy = ty - sy;
    this.distanceToTarget = Math.sqrt(dx * dx + dy * dy);
    this.angle = Math.atan2(dy, dx);
    this.speed = 2; // base speed
    this.brightness = Math.random() * 50 + 50;

    // Prefill tracker
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
  }

  update(onExplode: () => void): boolean {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.acceleration;

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    
    this.distanceTraveled = Math.sqrt(
      Math.pow(this.startX - (this.x + vx), 2) + Math.pow(this.startY - (this.y + vy), 2)
    );

    if (this.distanceTraveled >= this.distanceToTarget) {
      onExplode();
      return false; // rocket exploded
    } else {
      this.x += vx;
      this.y += vy;
      return true; // rocket still traveling
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // Move to the last tracked coordinates in the set, then draw a line to the current x and y
    const lastCoord = this.coordinates[this.coordinates.length - 1];
    ctx.moveTo(lastCoord[0], lastCoord[1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

class Particle {
  x: number;
  y: number;
  coordinates: [number, number][] = [];
  coordinateCount = 5;
  angle: number;
  speed: number;
  gravity = 0.08;
  friction = 0.95;
  decay: number;
  alpha = 1;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 8 + 2;
    this.decay = Math.random() * 0.015 + 0.007;

    // Prefill tracker
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
  }

  update(): boolean {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;

    return this.alpha > 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    const lastCoord = this.coordinates[this.coordinates.length - 1];
    ctx.moveTo(lastCoord[0], lastCoord[1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = this.alpha;
    ctx.stroke();
    ctx.restore();
  }
}

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    // Sparkly romantic colors
    const colors = [
      '#ff2a5f', // deep pink
      '#ff7da0', // light rose
      '#ffd700', // gold
      '#ea00d9', // vibrant pink
      '#ff5e00', // gold orange
      '#b5179e', // deep purple
      '#ffffff', // sparkle white
    ];

    const launchRocket = (tx?: number, ty?: number) => {
      const sx = Math.random() * width;
      const sy = height;
      const targetX = tx ?? Math.random() * width;
      const targetY = ty ?? Math.random() * (height * 0.5) + height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      rockets.push(new Rocket(sx, sy, targetX, targetY, color));
    };

    const explode = (x: number, y: number, color: string) => {
      const pCount = Math.floor(Math.random() * 40) + 60; // 60-100 particles
      for (let i = 0; i < pCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Auto launcher timer
    let ticks = 0;

    const loop = () => {
      // Clear with translucency for motion trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.draw(ctx);
        const alive = r.update(() => explode(r.targetX, r.targetY, r.color));
        if (!alive) {
          rockets.splice(i, 1);
        }
      }

      // Update and draw path particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.draw(ctx);
        const alive = p.update();
        if (!alive) {
          particles.splice(i, 1);
        }
      }

      // Automatically launch rockets
      if (ticks % 30 === 0) {
        launchRocket();
      }
      ticks++;

      animationFrameId = requestAnimationFrame(loop);
    };

    // Resize event
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Click handler for custom firework launches
    const handleClick = (e: MouseEvent) => {
      launchRocket(e.clientX, e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    
    // Shoot an initial batch of fireworks
    for (let i = 0; i < 4; i++) {
      setTimeout(() => launchRocket(), i * 300);
    }

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-[#0c0512] z-0 pointer-events-none"
    />
  );
}
