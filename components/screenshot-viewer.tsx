"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"

interface ScreenshotViewerProps {
  project: Project | null
  onClose: () => void
}

export function ScreenshotViewer({ project, onClose }: ScreenshotViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Collect all viewable images: screenshots array, falling back to the card image
  const images = project
    ? (project.screenshots && project.screenshots.length > 0)
      ? project.screenshots
      : [project.banner || project.image]
    : []

  const hasMultiple = images.length > 1

  const goNext = useCallback(() => {
    if (hasMultiple) setCurrentIndex((i) => (i + 1) % images.length)
  }, [hasMultiple, images.length])

  const goPrev = useCallback(() => {
    if (hasMultiple) setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [hasMultiple, images.length])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goNext()
    else if (e.key === "ArrowLeft") goPrev()
    else if (e.key === "Escape") onClose()
  }, [goNext, goPrev, onClose])

  if (!project) return null

  const currentImage = images[currentIndex] ?? project.image

  return (
    <AnimatePresence onExitComplete={() => {}}>
      <motion.div
        key={project.id}
        className="screenshot-viewer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <motion.div
          className="screenshot-viewer-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="screenshot-viewer-close" onClick={onClose} aria-label="Close screenshot viewer">
            <X size={24} />
          </button>
          <div className="screenshot-viewer-header">
            <h3>{project.title}</h3>
            <span className="screenshot-viewer-category">{project.label}</span>
            {hasMultiple && (
              <span className="screenshot-viewer-counter">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </div>

          <div className="screenshot-viewer-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                className="screenshot-viewer-image"
                src={currentImage}
                alt={`${project.title} screenshot ${currentIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {hasMultiple && (
              <>
                <button
                  className="screenshot-viewer-nav screenshot-viewer-nav-prev"
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="screenshot-viewer-nav screenshot-viewer-nav-next"
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip for multiple screenshots */}
          {hasMultiple && images.length <= 10 && (
            <div className="screenshot-viewer-strip">
              {images.map((src, index) => (
                <button
                  key={index}
                  className={`screenshot-viewer-strip-thumb${index === currentIndex ? " active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
                  aria-label={`View screenshot ${index + 1}`}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

interface ScreenshotButtonProps {
  project: Project
  onViewScreenshot: (project: Project) => void
}

export function ScreenshotButton({ project, onViewScreenshot }: ScreenshotButtonProps) {
  const count = project.screenshots?.length ?? 0
  const label = count > 0
    ? `${count} Screenshot${count !== 1 ? "s" : ""}`
    : "View Screenshot"

  return (
    <button
      type="button"
      className="pf-btn-screenshot"
      onClick={(e) => {
        e.stopPropagation()
        onViewScreenshot(project)
      }}
      aria-label={`View screenshots of ${project.title}`}
    >
      <ZoomIn size={16} aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
