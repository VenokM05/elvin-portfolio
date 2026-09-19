"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, ArrowRight, Sparkles, Globe, Server } from "lucide-react"

function AnimatedCounter({ target, suffix = "", duration = 1200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) { setCount(target); return }
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration, prefersReducedMotion])

  return <>{count}{suffix}</>
}

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
    let welcomed: string | null = null
    try { welcomed = localStorage.getItem("portfolio_welcomed") } catch { /* Storage may be unavailable. */ }
    if (!welcomed) {
      const timer = setTimeout(() => setIsOpen(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    try { localStorage.setItem("portfolio_welcomed", "true") } catch { /* Navigation still works without storage. */ }
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
              Welcome
            </h2>

            <div className="pf-welcome-body">
              <p>
                I&apos;m <a href="https://www.linkedin.com/in/elvin-manuel-181940147/" target="_blank" rel="noopener noreferrer" className="pf-link"><strong>Elvin Manuel</strong></a> &mdash; a software engineer and IT specialist
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
                <span className="pf-welcome-stat-value"><AnimatedCounter target={10} suffix="+" /></span>
                <span className="pf-welcome-stat-label">Years building</span>
              </div>
              <div className="pf-welcome-stat">
                <span className="pf-welcome-stat-value"><AnimatedCounter target={12} /></span>
                <span className="pf-welcome-stat-label">Projects shipped</span>
              </div>
              <div className="pf-welcome-stat">
                <span className="pf-welcome-stat-value"><AnimatedCounter target={4} /></span>
                <span className="pf-welcome-stat-label">Skill domains</span>
              </div>
            </div>

            <nav className="pf-welcome-roles" aria-label="Choose a portfolio">
              <Link href="/full-stack-developer" className="pf-welcome-role" onClick={handleClose}>
                <Globe size={15} aria-hidden="true" />
                Full Stack Web Developer
              </Link>
              <Link href="/it-specialist" className="pf-welcome-role" onClick={handleClose}>
                <Server size={15} aria-hidden="true" />
                IT Specialist
              </Link>
            </nav>

            <p className="pf-welcome-role-hint">
              Click above to explore my Full Stack Web Developer or IT Specialist portfolio
            </p>

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
