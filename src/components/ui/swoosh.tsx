import React from "react"
import { cn } from "@/lib/utils"

interface SwooshProps {
  className?: string
  size?: "sm" | "md" | "lg"
  gradient?: boolean
}

const Swoosh = React.forwardRef<SVGSVGElement, SwooshProps>(
  ({ className, size = "md", gradient = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-16 h-4",
      md: "w-24 h-6", 
      lg: "w-32 h-8"
    }

    const gradientId = `swoosh-gradient-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <svg
        ref={ref}
        className={cn(sizeClasses[size], className)}
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        )}
        <path
          d="M2 12c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"
          stroke={gradient ? `url(#${gradientId})` : "#fbbf24"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }
)

Swoosh.displayName = "Swoosh"

export { Swoosh }