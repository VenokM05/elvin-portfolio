"use client"

import { useState } from "react"
import { ArrowRight, Check, RotateCcw } from "lucide-react"
import { troubleshootingCases } from "@/lib/specialty-data"
import { SectionHeading } from "@/components/specialty-shell"

export function ITTroubleshooting() {
  const [selected, setSelected] = useState(0)
  const [steps, setSteps] = useState<Record<string, number>>({})
  const ticket = troubleshootingCases[selected]
  const step = steps[ticket.id] ?? 0
  const resolved = step === ticket.steps.length
  const status = resolved ? "Resolved example" : step > 0 ? "Investigating" : "Open example"
  return (
    <section id="troubleshooting" className="sp-container sp-section" aria-labelledby="troubleshooting-title">
      <SectionHeading id="troubleshooting-title" number="02 / The troubleshooting desk" title="Find the cause. Not just a workaround." description="Step through illustrative support scenarios. These demonstrate a diagnostic approach, not historical client tickets." />
      <div className="sp-troubleshoot">
        <div className="sp-ticket-list" role="group" aria-label="Choose a troubleshooting scenario">
          {troubleshootingCases.map((item, index) => <button key={item.id} type="button" className="sp-ticket" aria-pressed={selected === index} aria-controls="ticket-detail" onClick={() => setSelected(index)}><small><span>{item.id} / {item.category}</span><span>{steps[item.id] === item.steps.length ? "COMPLETE" : "EXAMPLE"}</span></small><strong>{item.title}</strong></button>)}
        </div>
        <div id="ticket-detail" className="sp-panel">
          <div className="sp-panel-bar"><span>{ticket.id} · Diagnostic walkthrough</span><span className="sp-tag sp-tag-accent" role="status">{status}</span></div>
          <div className="sp-ticket-body">
            <h3>{ticket.title}</h3><p>{ticket.symptom}</p>
            <ol className="sp-diagnostic-steps">
              {ticket.steps.map((text, index) => <li key={text} data-done={index < step}><span className="sp-step-dot">{index < step ? <Check size={12} aria-label="Reviewed" /> : index + 1}</span>{text}</li>)}
            </ol>
            <div aria-live="polite">{resolved && <div className="sp-ticket-result">{ticket.result}</div>}</div>
            <div className="sp-actions">
              <button type="button" className="sp-btn sp-btn-primary" onClick={() => setSteps((previous) => ({ ...previous, [ticket.id]: resolved ? 0 : Math.min(step + 1, ticket.steps.length) }))}>{resolved ? "Replay walkthrough" : `Review step ${step + 1} of ${ticket.steps.length}`}{resolved ? <RotateCcw size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}</button>
              <span className="sp-ai-note">Interactive example · No device changes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
