import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

// Shared intersection observer instance to reduce overhead
class SharedIntersectionObserver {
  private observer: IntersectionObserver | null = null
  private callbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>()
  private options: {
    threshold?: number | number[]
    rootMargin?: string
    root?: Element | Document | null
  }

  constructor(options: {
    threshold?: number | number[]
    rootMargin?: string
    root?: Element | Document | null
  } = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    }
    this.createObserver()
  }

  private createObserver() {
    if (typeof window === 'undefined') return

    this.observer = new IntersectionObserver((entries) => {
      // Throttle intersection callbacks to next frame for better performance
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const callback = this.callbacks.get(entry.target)
          if (callback) {
            callback(entry)
          }
        })
      })
    }, this.options)
  }

  observe(element: Element, callback: (entry: IntersectionObserverEntry) => void) {
    if (!this.observer) return

    this.callbacks.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    if (!this.observer) return

    this.observer.unobserve(element)
    this.callbacks.delete(element)
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
      this.callbacks.clear()
    }
  }
}

// Singleton instance for shared usage
const sharedObserver = new SharedIntersectionObserver()

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<Element | null>(null)
  const timeoutRef = useRef<number>()

  const ref = (element: Element | null) => {
    if (elementRef.current && elementRef.current !== element) {
      sharedObserver.unobserve(elementRef.current)
    }
    elementRef.current = element
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleIntersection = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
        if (delay > 0) {
          timeoutRef.current = window.setTimeout(() => {
            setIsIntersecting(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }, delay)
        } else {
          setIsIntersecting(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        }
      } else if (!entry.isIntersecting && !triggerOnce) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        setIsIntersecting(false)
      }
    }

    sharedObserver.observe(element, handleIntersection)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (element) {
        sharedObserver.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { ref, isIntersecting, hasTriggered }
}

// Cleanup function for when the app unmounts
export const cleanupSharedObserver = () => {
  sharedObserver.disconnect()
}