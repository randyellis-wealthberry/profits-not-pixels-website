import { useEffect, useState, useRef } from 'react'
import DecryptedText from './DecryptedText'

interface DecryptedHeaderProps {
  text: string
  highlightWords?: string[]
  className?: string
  triggerDelay?: number
  animationSpeed?: number
  maxIterations?: number
}

export default function DecryptedHeader({
  text,
  highlightWords = [],
  className = "text-4xl lg:text-5xl font-light",
  triggerDelay = 200,
  animationSpeed = 80,
  maxIterations = 10
}: DecryptedHeaderProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setShouldAnimate(true)
            setHasAnimated(true)
          }, triggerDelay)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [triggerDelay, hasAnimated])

  // Function to split text and apply highlights
  const renderTextWithHighlights = () => {
    if (!shouldAnimate) {
      // Show static text before animation
      return (
        <span className="text-gray-700 opacity-30">
          {highlightWords.reduce((acc, word) => {
            return acc.replace(new RegExp(`\\b${word}\\b`, 'g'), word)
          }, text)}
        </span>
      )
    }

    // Split text into parts and apply highlights
    let parts: Array<{ text: string; isHighlight: boolean }> = [{ text, isHighlight: false }]
    
    highlightWords.forEach(word => {
      const newParts: Array<{ text: string; isHighlight: boolean }> = []
      
      parts.forEach(part => {
        if (part.isHighlight) {
          newParts.push(part)
        } else {
          const regex = new RegExp(`(\\b${word}\\b)`, 'gi')
          const segments = part.text.split(regex)
          
          segments.forEach(segment => {
            if (segment.toLowerCase() === word.toLowerCase()) {
              newParts.push({ text: segment, isHighlight: true })
            } else if (segment) {
              newParts.push({ text: segment, isHighlight: false })
            }
          })
        }
      })
      
      parts = newParts
    })

    return parts.map((part, index) => (
      <DecryptedText
        key={index}
        text={part.text}
        className={part.isHighlight ? 'text-[#fbbf24]' : 'text-white'}
        encryptedClassName="text-gray-600 opacity-60"
        animateOn="view"
        sequential={true}
        revealDirection="start"
        speed={animationSpeed}
        maxIterations={maxIterations}
        useOriginalCharsOnly={false}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~[]{}|<>?.,;:"
      />
    ))
  }

  return (
    <h2 ref={containerRef} className={className}>
      {renderTextWithHighlights()}
    </h2>
  )
}