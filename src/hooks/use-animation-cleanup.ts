import { useEffect, useRef } from 'react'

// Animation cleanup utility for preventing memory leaks
export function useAnimationFrame(callback: () => void, deps: any[] = []) {
  const frameRef = useRef<number>()
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const animate = () => {
    callbackRef.current()
    frameRef.current = requestAnimationFrame(animate)
  }

  const start = () => {
    if (!frameRef.current) {
      console.log('Starting animation frame...');
      frameRef.current = requestAnimationFrame(animate)
    }
  }

  const stop = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = undefined
    }
  }

  useEffect(() => {
    return stop // Cleanup on unmount
  }, [])

  useEffect(() => {
    // Restart animation when dependencies change
    stop()
    start()
    return stop
  }, deps)

  return { start, stop, isRunning: !!frameRef.current }
}

// Timeout cleanup utility
export function useAnimationTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<number>()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const start = () => {
    stop() // Clear existing timeout
    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current()
      timeoutRef.current = undefined
    }, delay)
  }

  const stop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }

  useEffect(() => {
    return stop // Cleanup on unmount
  }, [])

  return { start, stop, isActive: !!timeoutRef.current }
}

// Multiple timeouts cleanup utility (like in DecryptedHeroTitle)
export function useMultipleTimeouts() {
  const timeoutsRef = useRef<Set<number>>(new Set())

  const addTimeout = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      callback()
      timeoutsRef.current.delete(timeoutId)
    }, delay)
    
    timeoutsRef.current.add(timeoutId)
    return timeoutId
  }

  const clearTimeout = (timeoutId: number) => {
    window.clearTimeout(timeoutId)
    timeoutsRef.current.delete(timeoutId)
  }

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => {
      window.clearTimeout(id)
    })
    timeoutsRef.current.clear()
  }

  useEffect(() => {
    return clearAllTimeouts // Cleanup all timeouts on unmount
  }, [])

  return { addTimeout, clearTimeout, clearAllTimeouts }
}

// Global cleanup function to be called before page unload
export const performGlobalAnimationCleanup = () => {
  // Cancel animation frames within reasonable range
  let id = requestAnimationFrame(() => {})
  for (let i = 0; i < 100; i++) {
    cancelAnimationFrame(id - i)
  }

  // Clear timeouts within reasonable range  
  let timeoutId = window.setTimeout(() => {}, 0)
  for (let i = 0; i < 100; i++) {
    clearTimeout(timeoutId - i)
  }
}

// Initialize global cleanup on beforeunload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', performGlobalAnimationCleanup)
}