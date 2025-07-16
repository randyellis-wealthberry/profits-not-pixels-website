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
  
  // Single subtle color for less distraction
  const hoverColor = "#fbbf24"; // Consistent amber color
  const maxOpacity = 0.15; // Much more subtle than before (was 1.0)

  // Easing function for smoother transitions
  const easeOutCubic = useCallback((t: number) => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const gridConfig = {
    rows: 150,     // Restore original
    cols: 100,     // Restore original
    cellWidth: 64, // Match original: h-8 w-16 = 32px height, 64px width
    cellHeight: 32,
    borderOpacity: 0.25, // Reduced border opacity too
    hoverRadius: prefersReducedMotion ? 40 : 80,     // Even smaller radius for reduced motion
    animationSpeed: 0.02
  };

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const { rows, cols, cellWidth, cellHeight, borderOpacity, hoverRadius } = gridConfig;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    
    // Recreate the original CSS transform exactly
    ctx.save();
    
    // Original CSS: absolute -top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 p-4 + transform
    // CSS transform: translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675)
    
    // First apply positioning (combine all translations)
    const totalTranslateX = canvas.width * 0.25 - canvas.width * 0.5 - canvas.width * 0.4;
    const totalTranslateY = -canvas.height * 0.25 - canvas.height * 0.5 - canvas.height * 0.6;
    
    // Apply all positioning at once
    ctx.translate(totalTranslateX, totalTranslateY);
    
    // Apply the main transform
    const skewXRad = -48 * Math.PI / 180;
    const skewYRad = 14 * Math.PI / 180;
    const scale = 0.675;
    
    // Create the full transformation matrix
    const a = scale;                            // scale x
    const b = Math.tan(skewYRad) * scale;      // skew y 
    const c = Math.tan(skewXRad) * scale;      // skew x
    const d = scale;                            // scale y
    const e = 0;                               // translate x
    const f = 0;                               // translate y
    
    ctx.transform(a, b, c, d, e, f);
    
    // Use full grid range but with performance check
    const visibleStartX = 0;
    const visibleEndX = Math.min(cols, 150); // Limit to manageable size
    const visibleStartY = 0;
    const visibleEndY = Math.min(rows, 100); // Limit to manageable size
    
    // Cache style strings for better performance
    const defaultFillStyle = 'rgba(15, 23, 42, 0.2)';
    const borderStrokeStyle = `rgba(100, 116, 139, ${borderOpacity})`;
    const crossStrokeStyle = 'rgba(100, 116, 139, 0.5)';
    
    for (let i = visibleStartY; i < visibleEndY; i++) {
      for (let j = visibleStartX; j < visibleEndX; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        
        // Calculate distance from mouse
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        const isHovered = distance < hoverRadius;
        
        // Draw cell background with subtle, eased hover effect
        if (isHovered && !prefersReducedMotion) {
          const rawIntensity = Math.max(0, 1 - distance / hoverRadius);
          const easedIntensity = easeOutCubic(rawIntensity); // Smoother falloff
          const opacity = easedIntensity * maxOpacity; // Much more subtle
          ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`; // Convert hex to rgba with low opacity
          ctx.fillRect(x, y, cellWidth, cellHeight);
        } else {
          ctx.fillStyle = defaultFillStyle;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        }
        
        // Draw borders (batch strokes for performance)
        ctx.strokeStyle = borderStrokeStyle;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        
        // Draw cross icons (every other cell)
        if (j % 2 === 0 && i % 2 === 0) {
          ctx.strokeStyle = crossStrokeStyle;
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
  }, [hoverColor, maxOpacity, easeOutCubic, prefersReducedMotion]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdate.current < 33) return; // Throttle to ~30fps for less distraction
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    
    // Transform mouse coordinates to match grid coordinate space
    // Need to reverse all the transforms we apply to the grid
    
    let transformedX = screenX;
    let transformedY = screenY;
    
    // Reverse the combined translation
    const totalTranslateX = canvas.width * 0.25 - canvas.width * 0.5 - canvas.width * 0.4;
    const totalTranslateY = -canvas.height * 0.25 - canvas.height * 0.5 - canvas.height * 0.6;
    
    transformedX -= totalTranslateX;
    transformedY -= totalTranslateY;
    
    // Reverse the scale and skew transform (approximate inverse)
    const scale = 0.675;
    const skewXRad = -48 * Math.PI / 180;
    const skewYRad = 14 * Math.PI / 180;
    
    // Apply inverse transform matrix (simplified approach)
    // For a matrix [a, b, c, d], the inverse is [d, -b, -c, a] / (ad - bc)
    const a = scale;
    const b = Math.tan(skewYRad) * scale;
    const c = Math.tan(skewXRad) * scale;
    const d = scale;
    const det = a * d - b * c;
    
    if (Math.abs(det) > 0.001) {
      const invA = d / det;
      const invB = -b / det;
      const invC = -c / det;
      const invD = a / det;
      
      const newX = transformedX * invA + transformedY * invC;
      const newY = transformedX * invB + transformedY * invD;
      
      transformedX = newX;
      transformedY = newY;
    }
    
    mousePositionRef.current = {
      x: transformedX,
      y: transformedY
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
    if (!canvas) {
      setCanvasError(true);
      return;
    }
    
    // Test if canvas context is available
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasError(true);
      return;
    }
    
    try {
      handleResize();
      isInitialized.current = true;
      
      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      // Start animation
      startAnimation();
      
      // Test initial draw
      setTimeout(() => {
        if (canvas.width === 0 || canvas.height === 0) {
          setCanvasError(true);
        }
      }, 100);
      
    } catch (error) {
      setCanvasError(true);
    }
    
    return () => {
      isInitialized.current = false;
      stopAnimation();
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize, startAnimation, stopAnimation]);

  // Fallback to DOM version if Canvas fails
  if (canvasError) {
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