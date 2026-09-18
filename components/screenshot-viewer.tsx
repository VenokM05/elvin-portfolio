"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"

interface ScreenshotViewerProps {
  project: Project | null
  onClose: () => void
}

export function ScreenshotViewer({ project, onClose }: ScreenshotViewerProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="screenshot-viewer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
          </div>
          <div className="screenshot-viewer-image">
            <img src={project.image} alt={`${project.title} screenshot`} />
          </div>
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
  return (
    <button
      type="button"
      className="pf-btn-screenshot"
      onClick={(e) => {
        e.stopPropagation()
        onViewScreenshot(project)
      }}
      aria-label={`View screenshot of ${project.title}`}
    >
      <ZoomIn size={16} aria-hidden="true" />
      <span>View Screenshot</span>
    </button>
  )
}
