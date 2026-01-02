"use client"

import { useEffect, useState } from "react"

export function NetflixLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Skip sound loading if the file doesn't exist
    const audio = new Audio()
    audio.volume = 0.5
    
    // Only try to play sound if we have a valid sound file
    // For now, we'll skip the sound to avoid 404 errors
    
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(timer)
      audio.pause()
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="netflix-loader fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="relative">
        <div className="netflix-logo-container">
          <div className="elvin-logo">
            <h1 className="text-7xl md:text-8xl font-bold text-primary animate-pulse">ELVIN</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
