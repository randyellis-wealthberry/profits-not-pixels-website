"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAnimationFrame } from "@/hooks/use-animation-cleanup";
import { Boxes } from "./background-boxes";

interface CanvasBackgroundProps {
  className?: string;
}

export const CanvasBackground = React.memo(({ className }: CanvasBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastMouseUpdate = useRef(0);
  const isInitialized = useRef(false);
  const [canvasError, setCanvasError] = React.useState(false);
  
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
    rows: 30,      // Smaller for debugging
    cols: 20,      // Smaller for debugging
    cellWidth: 64, // Match original: h-8 w-16 = 32px height, 64px width
    cellHeight: 32,
    borderOpacity: 0.4,
    hoverRadius: 120,
    animationSpeed: 0.02
  };

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Debug logging
    console.log('Drawing grid:', { width: canvas.width, height: canvas.height });
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const { rows, cols, cellWidth, cellHeight, borderOpacity, hoverRadius } = gridConfig;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    
    // Simplified approach - start with basic positioning and gradually add transforms
    ctx.save();
    
    // For debugging, let's start simple and build up the transform
    // Original CSS: translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675)
    
    // Step 1: Just basic translation to see if we get visible grid
    ctx.translate(canvas.width * 0.1, canvas.height * 0.1);
    
    // Step 2: Apply scale to make it smaller like original
    const scale = 0.8; // Start with less aggressive scale
    ctx.scale(scale, scale);
    
    // For now, skip the complex skew - we'll add it back once we see the basic grid
    
    let visibleCells = 0;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        
        // Check if cell would be visible (rough bounds check)
        if (x > -200 && x < canvas.width + 200 && y > -200 && y < canvas.height + 200) {
          visibleCells++;
          
          // Calculate distance from mouse (in screen space for now)
          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          const isHovered = distance < hoverRadius;
          
          // Draw cell background
          if (isHovered) {
            const intensity = Math.max(0, 1 - distance / hoverRadius);
            const alpha = Math.floor(intensity * 255).toString(16).padStart(2, '0');
            ctx.fillStyle = getRandomColor() + alpha;
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
    }
    
    console.log('Visible cells drawn:', visibleCells);
    ctx.restore();
  }, [getRandomColor]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdate.current < 16) return; // Throttle to ~60fps
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    
    // Transform mouse coordinates to match grid coordinate space
    // Reverse the simplified transform we apply to the grid
    const scale = 0.8;
    
    // Apply inverse transform to mouse coordinates
    let transformedX = screenX - canvas.width * 0.1;
    let transformedY = screenY - canvas.height * 0.1;
    
    // Reverse the scale
    transformedX = transformedX / scale;
    transformedY = transformedY / scale;
    
    mousePositionRef.current = {
      x: transformedX,
      y: transformedY
    };
    lastMouseUpdate.current = now;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized.current) {
      console.log('Animation skipped:', { hasCanvas: !!canvas, isInitialized: isInitialized.current });
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('No canvas context available');
      return;
    }
    
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
    if (!canvas) {
      console.log('Canvas ref not available');
      setCanvasError(true);
      return;
    }
    
    // Test if canvas context is available
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas 2D context not available');
      setCanvasError(true);
      return;
    }
    
    console.log('Initializing canvas background...');
    try {
      handleResize();
      isInitialized.current = true;
      
      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      // Start animation
      console.log('Starting animation...');
      startAnimation();
      
      // Test initial draw
      setTimeout(() => {
        if (canvas.width === 0 || canvas.height === 0) {
          console.log('Canvas has no dimensions, falling back');
          setCanvasError(true);
        }
      }, 100);
      
    } catch (error) {
      console.error('Canvas initialization error:', error);
      setCanvasError(true);
    }
    
    return () => {
      console.log('Cleaning up canvas background...');
      isInitialized.current = false;
      stopAnimation();
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize, startAnimation, stopAnimation]);

  // Fallback to DOM version if Canvas fails
  if (canvasError) {
    console.log('Using DOM fallback for background');
    return <Boxes className={className} />;
  }

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