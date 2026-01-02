"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Volume2, VolumeX } from "lucide-react"
import { ResumeModal } from "./resume-modal"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  // Function to handle navigation and close mobile menu
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded flex items-center justify-center font-bold text-lg md:text-xl text-white">
              E
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight">Elvin Manuel</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleNavigation}
              >
                {link.name}
              </Link>
            ))}

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Button variant="default" size="sm" className="font-bold" onClick={() => setIsResumeModalOpen(true)}>
              Resume
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <div
        className="h-[3px] bg-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-lg font-medium py-2 border-b border-border/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="default"
              className="w-full font-bold"
              onClick={() => {
                setIsResumeModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              Resume
            </Button>
          </div>
        </div>
      )}

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </nav>
  )
}
