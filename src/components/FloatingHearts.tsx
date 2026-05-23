import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  angle: number;
  spin: number;
  type: 'heart' | 'star';
  color: string;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const colors = [
      'rgba(244, 63, 94, ', // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(225, 29, 72, ', // rose-600
      'rgba(253, 164, 186, ', // rose-300
      'rgba(253, 224, 71, ', // yellow-300 (gold accents)
    ];

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial stars and background particles
    const generateStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: -Math.random() * 0.2 - 0.05,
          opacity: Math.random() * 0.7 + 0.3,
          fadeSpeed: 0, // ambient does not die
          angle: Math.random() * Math.PI * 2,
          spin: 0,
          type: Math.random() > 0.85 ? 'heart' : 'star',
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    generateStars(80);

    // Drawing helper for hearts
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string,
      angle: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      // Draw standard clean vector heart
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // Top-left curve
      context.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight / 2,
        0,
        size
      );
      // Top-right curve
      context.bezierCurveTo(
        size,
        topCurveHeight / 2,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );
      context.closePath();
      context.fillStyle = color.startsWith('rgba') ? `${color}${opacity})` : color;
      context.fill();
      context.restore();
    };

    // Drawing helper for stars
    const drawStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string
    ) => {
      context.save();
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fillStyle = color.startsWith('rgba') ? `${color}${opacity * 0.8})` : color;
      context.shadowBlur = size * 3;
      context.shadowColor = 'rgba(253, 224, 71, 0.4)';
      context.fill();
      context.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Add a tiny random flow of small rising hearts occasionally
      if (Math.random() < 0.1 && particles.length < 180) {
        particles.push({
          x: Math.random() * width,
          y: height + 20,
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 1.0 - 0.3,
          opacity: 0,
          fadeSpeed: 0.005, // slow fade-in then fade-out later
          angle: (Math.random() - 0.5) * 0.5,
          spin: (Math.random() - 0.5) * 0.02,
          type: 'heart',
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;

        // Fade in/out logic for spawns vs static stars
        if (p.fadeSpeed > 0) {
          if (p.opacity < 1 && p.y > height * 0.2) {
            p.opacity = Math.min(1, p.opacity + 0.02);
          } else {
            p.opacity -= p.fadeSpeed;
          }
        } else {
          // Ambient twinkling star pulse
          p.opacity += (Math.random() - 0.5) * 0.06;
          p.opacity = Math.max(0.2, Math.min(0.9, p.opacity));
        }

        // Clean out dead particles or elements far off-screen
        if (p.opacity <= 0 || p.y < -30 || p.x < -30 || p.x > width + 30) {
          if (p.fadeSpeed > 0) {
            particles.splice(i, 1);
          } else {
            // Re-spawn ambient star at bottom
            p.x = Math.random() * width;
            p.y = height + 10;
            p.opacity = Math.random() * 0.7 + 0.3;
          }
          continue;
        }

        // Add subtle attraction to mouse cursor coordinates
        if (mousePos.x !== -1000 && mousePos.y !== -1000) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Push or pull gently
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.1;
          }
        }

        // Render
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color, p.angle);
        } else {
          drawStar(ctx, p.x, p.y, p.size, p.opacity, p.color);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn faint sparkles occasionally on move
      if (Math.random() < 0.22 && particles.length < 250) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          size: Math.random() * 10 + 2,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: -Math.random() * 0.8 - 0.2,
          opacity: 0.1,
          fadeSpeed: 0.015,
          angle: (Math.random() - 0.5) * 0.3,
          spin: (Math.random() - 0.5) * 0.05,
          type: Math.random() > 0.4 ? 'heart' : 'star',
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    // Click handler for bursts!
    const handleClick = (e: MouseEvent) => {
      // Create dramatic burst of 12 beautiful hearts
      for (let i = 0; i < 15; i++) {
        const velAngle = (i / 15) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const velSpeed = Math.random() * 2.2 + 0.8;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 12 + 6,
          speedX: Math.cos(velAngle) * velSpeed,
          speedY: Math.sin(velAngle) * velSpeed - 0.5,
          opacity: 1,
          fadeSpeed: 0.012 + Math.random() * 0.008,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.1,
          type: 'heart',
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      id="floating-hearts-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 block h-full w-full"
    />
  );
}
