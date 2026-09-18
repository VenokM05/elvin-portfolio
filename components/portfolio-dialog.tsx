"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { ContactModal } from "./contact-modal"
import { ResumeModal } from "./resume-modal"
import { initialMessages, PortfolioAssistant } from "./portfolio-assistant"
import type { Project } from "@/lib/portfolio-data"
import type { GuideAction } from "@/lib/portfolio-guide"

export type PortfolioModal = { kind: "project"; project: Project } | { kind: "guide" | "resume" | "contact" }
interface PortfolioDialogProps {
  modal: PortfolioModal | null
  onClose: () => void
  onAfterClose: () => void
  onGuideAction: (action: GuideAction) => void
}

export function PortfolioDialog({ modal, onClose, onAfterClose, onGuideAction }: PortfolioDialogProps) {
  const [messages, setMessages] = useState(initialMessages)
  const content = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!modal) return
    content.current?.querySelector<HTMLElement>("[data-modal-focus]")?.focus({ preventScroll: true })
    if (content.current) content.current.scrollTop = 0
  }, [modal])

  const overlayTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
  const contentTransition = { duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" as const }

  return (
    <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      <AnimatePresence>
        {modal && (
          <DialogContent ref={content} showCloseButton={false}
            className={`portfolio-modal ${modal.kind === "guide" ? "pf-guide-dialog" : "pf-project-dialog"}`}
            onOpenAutoFocus={(event) => {
              event.preventDefault()
              content.current?.querySelector<HTMLElement>("[data-modal-focus]")?.focus({ preventScroll: true })
            }}
            onCloseAutoFocus={(event) => { event.preventDefault(); onAfterClose() }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={contentTransition}
              >
                <div className="pf-dialog-header">
                  <span className="pf-eyebrow">{modal.kind === "project" ? "Inside the project" : "Explore & connect"}</span>
                  <DialogClose className="pf-close" aria-label="Close dialog"><X size={20} aria-hidden="true" /></DialogClose>
                </div>
                {modal.kind === "guide" && <PortfolioAssistant messages={messages} onMessages={setMessages} onAction={onGuideAction} />}
                {modal.kind === "resume" && <ResumeModal />}
                {modal.kind === "contact" && <ContactModal />}
                {modal.kind === "project" && (
                  <>
                    <img
                      className="pf-dialog-image"
                      src={modal.project.banner || modal.project.image}
                      alt={`${modal.project.title} banner`}
                      width={720}
                      height={360}
                    />
                    <div className="pf-dialog-body">
                      <span className="pf-category">{modal.project.label}</span>
                      <DialogTitle tabIndex={-1} data-modal-focus>{modal.project.title}</DialogTitle>
                      <DialogDescription>{modal.project.description}</DialogDescription>
                      <ul className="pf-tags" aria-label="Technologies">
                        {modal.project.tags.map((tag, i) => (
                          <motion.li
                            className="pf-tag"
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.15 + i * 0.04, ease: "easeOut" as const }}
                          >{tag}</motion.li>
                        ))}
                      </ul>
                      {modal.project.link && (
                        <a className="pf-btn pf-btn-primary" href={modal.project.link} target="_blank" rel="noopener noreferrer">Visit live site ↗<span className="sr-only"> (opens in a new tab)</span></a>
                      )}
                      <small>External site. Some projects may require an account or be available only during an event.</small>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
