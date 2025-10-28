"use client";

import { useEffect, useRef } from "react";

const StarsBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId: number;

    // Mouse position
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    // Responsive resize
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Star settings
    const STAR_COUNT = 80;
    const STAR_MIN_RADIUS = 1;
    const STAR_MAX_RADIUS = 2.2;
    const STAR_SPEED = 0.18;
    const LINE_DISTANCE = 120; // px
    let stars: Array<{x: number, y: number, r: number, dx: number, dy: number}> = [];

    function getTheme() {
      const html = document.documentElement;
      return html.classList.contains("dark")
        ? { star: "#fff", line: "#fff" }
        : { star: "#000", line: "#000" };
    }

    function createStars() {
      if (!canvas) return;
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const r = Math.random() * (STAR_MAX_RADIUS - STAR_MIN_RADIUS) + STAR_MIN_RADIUS;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r,
          dx: (Math.random() - 0.5) * STAR_SPEED,
          dy: (Math.random() - 0.5) * STAR_SPEED,
        });
      }
    }
    createStars();

    // Animate
    function animate() {
      if (!canvas || !ctx) return;
      const { star, line } = getTheme();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw lines between close stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i], b = stars[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINE_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = line;
            ctx.globalAlpha = 0.18 * (1 - dist / LINE_DISTANCE);
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
        // Draw line to mouse if close
        const a = stars[i];
        const distMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (distMouse < LINE_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = line;
          ctx.globalAlpha = 0.22 * (1 - distMouse / LINE_DISTANCE);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      // Draw stars
      for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = star;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Move
        s.x += s.dx;
        s.y += s.dy;
        // Bounce off edges
        if (canvas) {
          if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
          if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
          // Clamp
          s.x = Math.max(0, Math.min(canvas.width, s.x));
          s.y = Math.max(0, Math.min(canvas.height, s.y));
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Theme change observer
    const observer = new MutationObserver(() => {
      animate();
    });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarsBg;