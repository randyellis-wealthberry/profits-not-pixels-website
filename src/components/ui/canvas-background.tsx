"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAnimationFrame } from "@/hooks/use-animation-cleanup";

interface CanvasBackgroundProps {
  className?: string;
}

export const CanvasBackground = React.memo(({ className }: CanvasBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastMouseUpdate = useRef(0);
  const isInitialized = useRef(false);
  
  const colors = [
    "#fbbf24",
    "#f59e0b", 
    "#d97706",
    "#92400e",
    "#451a03",
    "#a16207",
    "#78350f"
  ];

  const gridConfig = {
    rows: 60,      // Reduced from 150
    cols: 40,      // Reduced from 100  
    cellWidth: 32,
    cellHeight: 32,
    borderOpacity: 0.4,
    hoverRadius: 120,
    animationSpeed: 0.02
  };

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const { rows, cols, cellWidth, cellHeight, borderOpacity, hoverRadius } = gridConfig;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    
    // Apply transform similar to original CSS using setTransform
    ctx.save();
    
    // Calculate transformation matrix for skew effect
    const skewX = -48 * Math.PI / 180;
    const skewY = 14 * Math.PI / 180;
    const scale = 0.675;
    
    // Apply compound transformation
    ctx.translate(canvas.width * 0.6, canvas.height * 1.6);
    ctx.transform(
      scale, 
      Math.tan(skewY) * scale, 
      Math.tan(skewX) * scale, 
      scale, 
      -canvas.width * 0.4, 
      -canvas.height * 0.6
    );
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        
        // Calculate distance from mouse
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        const isHovered = distance < hoverRadius;
        
        // Draw cell background
        if (isHovered) {
          const intensity = Math.max(0, 1 - distance / hoverRadius);
          ctx.fillStyle = getRandomColor() + Math.floor(intensity * 255).toString(16).padStart(2, '0');
          ctx.fillRect(x, y, cellWidth, cellHeight);
        } else {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // bg-slate-900/20
          ctx.fillRect(x, y, cellWidth, cellHeight);
        }
        
        // Draw borders
        ctx.strokeStyle = `rgba(100, 116, 139, ${borderOpacity})`; // border-slate-500/40
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        
        // Draw cross icons (every other cell)
        if (j % 2 === 0 && i % 2 === 0) {
          ctx.strokeStyle = `rgba(100, 116, 139, 0.5)`;
          ctx.lineWidth = 1.5;
          const centerX = x + cellWidth / 2;
          const centerY = y + cellHeight / 2;
          const size = 8;
          
          // Draw cross
          ctx.beginPath();
          ctx.moveTo(centerX - size, centerY);
          ctx.lineTo(centerX + size, centerY);
          ctx.moveTo(centerX, centerY - size);
          ctx.lineTo(centerX, centerY + size);
          ctx.stroke();
        }
      }
    }
    
    ctx.restore();
  }, [getRandomColor]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdate.current < 16) return; // Throttle to ~60fps
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mousePositionRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    lastMouseUpdate.current = now;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawGrid(ctx, canvas);
  }, [drawGrid]);

  const { start: startAnimation, stop: stopAnimation } = useAnimationFrame(animate, [drawGrid]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Set CSS size to prevent scaling issues
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    handleResize();
    isInitialized.current = true;
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Start animation
    startAnimation();
    
    return () => {
      isInitialized.current = false;
      stopAnimation();
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize, startAnimation, stopAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-1", className)}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    />
  );
});

CanvasBackground.displayName = "CanvasBackground";