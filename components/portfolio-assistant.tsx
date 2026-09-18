"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { answerPortfolioQuestion, type GuideAction, type GuideReply, type GuideTopic } from "@/lib/portfolio-guide"

export interface GuideMessage extends GuideReply { id: number; user?: boolean }
export const initialMessages: GuideMessage[] = [{
  id: 0,
  text: "Hi! I'm your portfolio guide. I can help you explore Elvin's projects, find a technology, or take a quick tour. Where would you like to start?",
}]

interface PortfolioAssistantProps {
  messages: GuideMessage[]
  onMessages: (messages: GuideMessage[]) => void
  onAction: (action: GuideAction) => void
}

export function PortfolioAssistant({ messages, onMessages, onAction }: PortfolioAssistantProps) {
  const [input, setInput] = useState("")
  const log = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight }, [messages])

  const ask = (question: string, topic?: GuideTopic) => {
    const text = question.trim().slice(0, 300)
    if (!text) return
    const id = (messages.at(-1)?.id ?? 0) + 1
    onMessages([...messages, { id, user: true, text }, { id: id + 1, ...answerPortfolioQuestion(text, topic) }].slice(-30))
    setInput("")
    inputRef.current?.focus({ preventScroll: true })
  }
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input) }

  return (
    <div className="pf-guide-body">
      <div className="pf-guide-heading">
        <span className="pf-guide-avatar" aria-hidden="true">E</span>
        <div><DialogTitle>Portfolio guide</DialogTitle><small>A little help finding your way</small></div>
      </div>
      <DialogDescription className="pf-guide-disclaimer">A local, scripted assistant—not a live AI service. Answers are based on this portfolio only.</DialogDescription>
      <div className="pf-guide-log" ref={log} role="log" aria-label="Conversation with the portfolio guide" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {messages.map((message) => (
          <div className="pf-message" data-user={message.user || undefined} key={message.id}>
            <span className="sr-only">{message.user ? "You: " : "Guide: "}</span><p>{message.text}</p>
            {message.action && <button type="button" className="pf-btn pf-btn-quiet" onClick={() => onAction(message.action!)}>{message.label}</button>}
          </div>
        ))}
      </div>
      <div className="pf-guide-actions" role="group" aria-label="Suggested questions">
        {([['projects', 'Explore projects'], ['skills', 'Skills & background'], ['upcoming', "What's next?"], ['contact', 'Get in touch']] as const).map(([topic, label]) => (
          <button key={topic} type="button" className="pf-btn pf-btn-quiet" onClick={() => ask(label, topic)}>{label}</button>
        ))}
        <button type="button" className="pf-btn pf-btn-quiet" onClick={() => onAction({ kind: "tour" })}>Take a tour →</button>
      </div>
      <form className="pf-guide-form" onSubmit={submit}>
        <label htmlFor="guide-input" className="sr-only">Ask about this portfolio</label>
        <input ref={inputRef} data-modal-focus id="guide-input" autoComplete="off" maxLength={300} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Try “Next.js” or “AR Hunt”…" />
        <button className="pf-btn pf-btn-primary" type="submit" disabled={!input.trim()}>Send</button>
      </form>
      <p className="pf-guide-disclaimer">No API key. No chat saved or sent to a server. Please don&apos;t share sensitive information.</p>
    </div>
  )
}
