"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { profile } from "@/lib/portfolio-data"

// Rendered inside the shared portfolio dialog so guide actions never stack modals.
export function ContactModal() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const request = useRef<AbortController | null>(null)
  useEffect(() => () => request.current?.abort(), [])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (request.current) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const controller = new AbortController()
    request.current = controller
    setStatus("sending")
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data), signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]),
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true) throw new Error(result.error || "We couldn't confirm delivery. Please try again or email me directly.")
      if (controller.signal.aborted) return
      form.reset()
      setStatus("success")
    } catch (failure) {
      if (controller.signal.aborted) return
      setError(failure instanceof Error && failure.name === "Error" ? failure.message : "We couldn't confirm delivery. Please try again or email me directly.")
      setStatus("error")
    } finally { request.current = null }
  }

  return (
    <div className="pf-dialog-body">
      <DialogTitle tabIndex={-1} data-modal-focus>Get in touch</DialogTitle>
      <DialogDescription>Have a project in mind? Send a message, or <a className="pf-link" href={`mailto:${profile.email}`}>email me directly</a>. Submissions are processed by Formspree.</DialogDescription>
      <form onSubmit={submit}>
        <fieldset className="pf-form" disabled={status === "sending"} aria-busy={status === "sending"}>
          <div className="pf-field"><Label htmlFor="contact-name">Name</Label><Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" maxLength={100} required /></div>
          <div className="pf-field"><Label htmlFor="contact-email">Email</Label><Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></div>
          <div className="pf-field"><Label htmlFor="contact-message">Message</Label><Textarea id="contact-message" name="message" placeholder="Tell me about your project…" minLength={10} maxLength={5000} rows={5} required /></div>
          <div className="sr-only" aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <button className="pf-btn pf-btn-primary" type="submit">{status === "sending" ? "Sending…" : "Send message"}</button>
        </fieldset>
        {status === "success" && <p className="pf-success" role="status">Your message was submitted successfully. Thank you for reaching out!</p>}
        {status === "error" && <p className="pf-error" role="alert">{error}</p>}
      </form>
    </div>
  )
}
