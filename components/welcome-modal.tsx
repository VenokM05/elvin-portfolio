"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Sparkles } from "lucide-react"

interface WelcomeModalProps {
  onStartTour: () => void
}

export function WelcomeModal({ onStartTour }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    setMounted(true)
    const welcomed = localStorage.getItem("portfolio_welcomed")
    if (!welcomed) {
      const timer = setTimeout(() => setIsOpen(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("portfolio_welcomed", "true")
  }

  const handleStartTour = () => {
    handleClose()
    setTimeout(() => onStartTour(), 300)
  }

  if (!mounted) return null

  const overlayTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const }

  const modalTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeOut" as const, delay: 0.1 }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pf-welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={handleClose}
          role="presentation"
        >
          <motion.div
            className="pf-welcome-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={modalTransition}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pf-welcome-close"
              onClick={handleClose}
              aria-label="Close welcome message"
            >
              <X size={18} />
            </button>

            <div className="pf-welcome-badge">
              <Sparkles size={16} aria-hidden="true" />
              <span>Welcome</span>
            </div>

            <h2 id="welcome-title" className="pf-welcome-title">
              Welcome to Elvin&apos;s Portfolio
            </h2>

            <div className="pf-welcome-body">
              <p>
                I&apos;m <strong>Elvin Manuel</strong> &mdash; a software engineer and IT specialist
                with over a decade of experience. I started freelancing in 2014, went professional
                in 2016, and have been building ever since.
              </p>
              <p>
                My work spans <strong>web applications</strong>, <strong>interactive games</strong>,
                <strong> AR experiences</strong>, and the <strong>hardware and network
                infrastructure</strong> that powers them all.
              </p>
            </div>

            <div className="pf-welcome-stats">
              <div className="pf-welcome-stat">
                <span className="pf-welcome-stat-value">10+</span>
                <span className="pf-welcome-stat-label">Years building</span>
              </div>
              <div className="pf-welcome-stat">
                <span className="pf-welcome-stat-value">10</span>
                <span className="pf-welcome-stat-label">Projects shipped</span>
              </div>
              <div className="pf-welcome-stat">
                <span className="pf-welcome-stat-value">4</span>
                <span className="pf-welcome-stat-label">Skill domains</span>
              </div>
            </div>

            <div className="pf-welcome-actions">
              <button
                type="button"
                className="pf-btn pf-btn-primary"
                onClick={handleStartTour}
              >
                Take a quick tour <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="pf-btn pf-btn-quiet"
                onClick={handleClose}
              >
                Explore on my own
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
