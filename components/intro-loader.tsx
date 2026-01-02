"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const audio = new Audio("/netflix-intro-sound.mp3")
    audio.volume = 0.5

    const playTimeout = setTimeout(() => {
      audio.play().catch((err) => console.log("[v0] Audio play prevented:", err))
    }, 100)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500) // Ensure exit animation finishes
    }, 3500)

    return () => {
      clearTimeout(timer)
      clearTimeout(playTimeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1, 1.2, 5],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              className="text-primary font-black text-8xl md:text-9xl tracking-tighter"
            >
              E
            </motion.div>

            {/* Animated lines mimicking the Netflix logo "ribbons" */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
