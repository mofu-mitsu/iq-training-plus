"use client";

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  type: 'bubble' | 'light' | 'fish';
  direction?: 'left' | 'right';
  fishLength?: number;
};

export default function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numBubbles = Math.floor(window.innerWidth / 20);
      const numLights = Math.floor(window.innerWidth / 15);
      const numFishes = 12;

      for (let i = 0; i < numBubbles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 1 + 0.5),
          speedX: Math.random() * 0.5 - 0.25,
          color: 'rgba(0, 243, 255, 0.4)',
          type: 'bubble'
        });
      }

      for (let i = 0; i < numLights; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedY: Math.random() * 0.5 - 0.25,
          speedX: Math.random() * 0.5 - 0.25,
          color: 'rgba(255, 0, 255, 0.3)',
          type: 'light'
        });
      }

      for (let i = 0; i < numFishes; i++) {
        const direction = Math.random() > 0.5 ? 'right' : 'left';
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8 + canvas.height * 0.1,
          size: Math.random() * 5 + 3,
          speedY: Math.random() * 0.4 - 0.2,
          speedX: (Math.random() * 1 + 0.5) * (direction === 'right' ? 1 : -1),
          color: Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 0, 255, 0.2)',
          type: 'fish',
          direction,
          fishLength: Math.random() * 15 + 10
        });
      }
    };

    const drawFish = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.direction === 'left') {
        ctx.scale(-1, 1);
      }
      
      // Neon glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, p.fishLength!, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-p.fishLength! + 2, 0);
      ctx.lineTo(-p.fishLength! - p.size * 2, -p.size * 1.5);
      ctx.lineTo(-p.fishLength! - p.size * 2, p.size * 1.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      // Clear with slight trail effect
      ctx.fillStyle = 'rgba(5, 5, 16, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.type === 'bubble') {
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'light') {
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;
          if (p.y < -10) p.y = canvas.height + 10;
          if (p.y > canvas.height + 10) p.y = -10;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === 'fish') {
          // Fish bounds wrapping
          if (p.direction === 'right' && p.x > canvas.width + 50) p.x = -50;
          if (p.direction === 'left' && p.x < -50) p.x = canvas.width + 50;
          
          if (p.y < 50) p.speedY = Math.abs(p.speedY);
          if (p.y > canvas.height - 50) p.speedY = -Math.abs(p.speedY);
          
          // Random slight direction changes
          if (Math.random() < 0.02) p.speedY += (Math.random() * 0.2 - 0.1);
          
          // Clamp speed Y
          p.speedY = Math.max(-1, Math.min(1, p.speedY));

          drawFish(p);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080015]">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTA0IiB2aWV3Qm94PSIwIDAgNjAgMTA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zMCAxMEw2MCAyNlY1OEwzMCA3NEwwIDU4VjI2TDMwIDEweiIgc3Ryb2tlPSIjMDBmM2ZmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')", backgroundSize: "60px 104px" }} />
      {/* Soft colored glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/15 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-pink-500/15 rounded-full blur-[150px] mix-blend-screen" />
      {/* Canvas for particles and fish */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
