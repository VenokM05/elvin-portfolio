"use client"

import { useEffect, useRef, useState } from "react"
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
  useEffect(() => {
    if (!modal) return
    // One modal surface: transitions replace its body without competing focus traps.
    content.current?.querySelector<HTMLElement>("[data-modal-focus]")?.focus({ preventScroll: true })
    if (content.current) content.current.scrollTop = 0
  }, [modal])

  return (
    <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      {modal && (
        <DialogContent ref={content} showCloseButton={false}
          className={`portfolio-modal ${modal.kind === "guide" ? "pf-guide-dialog" : "pf-project-dialog"}`}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            content.current?.querySelector<HTMLElement>("[data-modal-focus]")?.focus({ preventScroll: true })
          }}
          onCloseAutoFocus={(event) => { event.preventDefault(); onAfterClose() }}>
          <div className="pf-dialog-header">
            <span className="pf-eyebrow">{modal.kind === "project" ? "Inside the project" : "Explore & connect"}</span>
            <DialogClose className="pf-close" aria-label="Close dialog"><X size={20} aria-hidden="true" /></DialogClose>
          </div>
          {modal.kind === "guide" && <PortfolioAssistant messages={messages} onMessages={setMessages} onAction={onGuideAction} />}
          {modal.kind === "resume" && <ResumeModal />}
          {modal.kind === "contact" && <ContactModal />}
          {modal.kind === "project" && (
            <>
              <img className="pf-dialog-image" src={modal.project.image} alt={`${modal.project.title} preview`} width={720} height={360} />
              <div className="pf-dialog-body">
                <span className="pf-category">{modal.project.label}</span>
                <DialogTitle tabIndex={-1} data-modal-focus>{modal.project.title}</DialogTitle>
                <DialogDescription>{modal.project.description}</DialogDescription>
                <ul className="pf-tags" aria-label="Technologies">{modal.project.tags.map((tag) => <li className="pf-tag" key={tag}>{tag}</li>)}</ul>
                <a className="pf-btn pf-btn-primary" href={modal.project.link} target="_blank" rel="noopener noreferrer">Visit live site ↗<span className="sr-only"> (opens in a new tab)</span></a>
                <small>External site. Some projects may require an account or be available only during an event.</small>
              </div>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}
