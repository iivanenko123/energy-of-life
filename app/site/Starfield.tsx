"use client";

import React from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number };

type Nebula = {
  x: number; // normalized 0..1
  y: number; // normalized 0..1
  r: number; // relative radius
  phase: number;
  color: [number, number, number];
};

export default function Starfield() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth * devicePixelRatio);
    let height = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const stars: Star[] = [];
    const COUNT = Math.floor((window.innerWidth * window.innerHeight) / 8000);

    function resetStar(s: Star) {
      s.x = Math.random() * window.innerWidth;
      s.y = Math.random() * window.innerHeight;
      s.z = Math.random() * 0.6 + 0.4; // depth
      s.r = Math.random() * 1.6 + 0.4;
      s.tw = Math.random() * 2 * Math.PI;
    }

    for (let i = 0; i < COUNT; i++) {
      const s: Star = { x: 0, y: 0, z: 1, r: 1, tw: 0 };
      resetStar(s);
      stars.push(s);
    }

    const nebulaColors: Array<[number, number, number]> = [
      [34, 211, 238], // cyan
      [168, 85, 247], // violet
      [236, 72, 153], // pink
      [56, 189, 248], // sky
      [251, 191, 36] // amber
    ];

    const nebulae: Nebula[] = Array.from({ length: 6 }, (_, i) => {
      const color = nebulaColors[i % nebulaColors.length];
      return {
        x: Math.random(),
        y: Math.random(),
        r: 0.35 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        color
      };
    });

    const start = performance.now();

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      width = (canvas.width = window.innerWidth * devicePixelRatio);
      height = (canvas.height = window.innerHeight * devicePixelRatio);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    function frame() {
      raf = requestAnimationFrame(frame);
      mouseX += (targetX - mouseX) * 0.03;
      mouseY += (targetY - mouseY) * 0.03;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Keep canvas mostly transparent so page gradients remain visible.
      // Add only a subtle vignette to keep "space" feeling.
      const w = window.innerWidth;
      const h = window.innerHeight;
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h));
      vignette.addColorStop(0, "rgba(0,0,0,0.00)");
      vignette.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Nebula / cosmic-color clouds (soft and slow).
      const t = performance.now() - start;
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        const wobbleX = Math.sin(t * 0.00005 + n.phase) * w * 0.06;
        const wobbleY = Math.cos(t * 0.00004 + n.phase) * h * 0.05;
        const cx = n.x * w + wobbleX;
        const cy = n.y * h + wobbleY;
        const pulse = 0.65 + 0.35 * Math.sin(t * 0.00022 + n.phase);
        const radius = Math.max(w, h) * (n.r * 0.85);

        const [cr, cg, cb] = n.color;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${0.075 * pulse})`);
        g.addColorStop(0.55, `rgba(${cr},${cg},${cb},${0.03 * pulse})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // star glow color overlays
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += mouseX * s.z * 0.35;
        s.y += mouseY * s.z * 0.18;

        // Slow twinkle progression (more planar / calm).
        const twInc = 0.0022 + (1 - s.z) * 0.0016;
        s.tw += reduceMotion ? 0 : twInc;
        if (
          s.x < -50 ||
          s.x > window.innerWidth + 50 ||
          s.y < -50 ||
          s.y > window.innerHeight + 50
        ) {
          resetStar(s);
        }

        const tw01 = 0.5 + 0.5 * Math.sin(s.tw);
        const alpha = 0.22 + 0.48 * tw01 * tw01; // brighter, still slow
        const radius = s.r * (0.85 + s.z * 0.95);

        // cyan / purple twinkle mix
        ctx.beginPath();
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 2.2);
        g.addColorStop(0, `rgba(34,211,238,${0.78 * alpha})`);
        g.addColorStop(1, `rgba(168,85,247,0)`);
        ctx.fillStyle = g;
        ctx.arc(s.x, s.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.85 * alpha})`;
        ctx.arc(s.x, s.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}

