import { useEffect, useState } from 'react'
import DecryptedText from './DecryptedText'

export default function DecryptedHeroTitle() {
  const [animationStage, setAnimationStage] = useState(0)

  const lines = [
    { text: 'PROFITS,', delay: 800, className: 'text-white' },
    { text: 'NOT', delay: 1400, className: 'text-[#fbbf24]' },
    { text: 'PIXELS', delay: 2000, className: 'text-white' }
  ]

  useEffect(() => {
    // Start first line immediately when component mounts
    const startTimer = setTimeout(() => {
      setAnimationStage(1)
    }, 200)

    // Set up timers for subsequent lines
    const lineTimers = lines.map((line, index) => {
      return setTimeout(() => {
        setAnimationStage(index + 1)
      }, line.delay)
    })

    return () => {
      clearTimeout(startTimer)
      lineTimers.forEach(clearTimeout)
    }
  }, [])

  return (
    <h1 className="text-5xl lg:text-7xl font-light tracking-tight">
      {lines.map((line, index) => (
        <div key={index} className="block">
          {animationStage > index ? (
            <DecryptedText
              text={line.text}
              className={line.className}
              encryptedClassName="text-gray-600 opacity-60"
              animateOn="view"
              sequential={true}
              revealDirection="start"
              speed={80}
              maxIterations={12}
              useOriginalCharsOnly={false}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~[]{}|<>?.,;:"
            />
          ) : (
            <span className="text-gray-700 opacity-20">{line.text}</span>
          )}
        </div>
      ))}
    </h1>
  )
}