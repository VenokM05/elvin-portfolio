"use client"

import { useEffect, useRef, useState } from "react"
import { Download, ExternalLink } from "lucide-react"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { profile } from "@/lib/portfolio-data"

export function ResumeModal() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const request = useRef<AbortController | null>(null)
  const downloadUrl = useRef<string | null>(null)
  useEffect(() => () => {
    request.current?.abort()
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current)
  }, [])

  const download = async () => {
    if (request.current) return
    const controller = new AbortController()
    request.current = controller
    setStatus("loading")
    try {
      const response = await fetch(profile.resume, {
        cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]),
      })
      if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) throw new Error("Resume unavailable")
      const pdf = await response.blob()
      if ((await pdf.slice(0, 5).text()) !== "%PDF-") throw new Error("Invalid PDF")
      if (controller.signal.aborted) return
      if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current)
      downloadUrl.current = URL.createObjectURL(pdf)
      const link = document.createElement("a")
      link.href = downloadUrl.current
      link.download = "Elvin_Manuel_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      link.remove()
      setStatus("success")
    } catch {
      if (!controller.signal.aborted) setStatus("error")
    } finally { request.current = null }
  }

  return (
    <div className="pf-dialog-body">
      <DialogTitle tabIndex={-1} data-modal-focus>Resume & profile</DialogTitle>
      <DialogDescription>Download Elvin&apos;s resume when available, or explore his professional history on LinkedIn.</DialogDescription>
      <div className="pf-form">
        <a className="pf-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          View LinkedIn profile <ExternalLink size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
        <button className="pf-btn pf-btn-primary" type="button" onClick={download} disabled={status === "loading"}>
          <Download size={18} aria-hidden="true" />{status === "loading" ? "Preparing PDF…" : "Download resume PDF"}
        </button>
        {status === "error" && <p className="pf-error" role="alert">The resume PDF is currently unavailable. Please <a className="pf-link" href={`mailto:${profile.email}?subject=Resume%20request`}>request a copy by email</a> or view LinkedIn.</p>}
        {status === "success" && <p className="pf-success" role="status">Your PDF download has started.</p>}
      </div>
    </div>
  )
}
