"use client"

import { useState } from "react"
import { ArrowUpRight, Bot, ShieldCheck, Sparkles } from "lucide-react"
import { aiExamples } from "@/lib/specialty-data"
import { learningTopics, type Project } from "@/lib/portfolio-data"
import type { Specialty } from "@/components/specialty-shell"

export function SpecialtyAI({ kind, items }: { kind: Specialty; items: Project[] }) {
  const [selected, setSelected] = useState(0)
  const developer = kind === "developer"
  const examples = aiExamples[kind]
  const example = examples[selected]
  const aiProjects = items.filter((project) => ["loki", "odin"].includes(project.id))
  return (
    <section id="ai-lab" className="sp-container sp-section sp-ai" aria-labelledby="ai-title">
      <div className="sp-ai-copy">
        <div className="sp-eyebrow"><Sparkles size={14} aria-hidden="true" />{developer ? "05" : "04"} / AI exploration</div>
        <h2 id="ai-title">{developer ? "A copilot for the work. Not a replacement for thinking." : "Smarter support starts with better questions."}</h2>
        <p>{developer ? "I’m exploring AI-assisted development through Loki IDE and Odin Desktop: local-first tools, agent workflows, and a more thoughtful way to go from an idea to implementation." : "I’m exploring how AI can support IT work: organizing symptoms, summarizing logs, and turning verified fixes into useful knowledge. These are learning directions, not deployed monitoring services."}</p>
        <div className="sp-tags">{learningTopics.slice(0, 3).map((topic) => <span className="sp-tag" key={topic.title}>{topic.title}</span>)}</div>
        <div className="sp-link"><ShieldCheck size={16} aria-hidden="true" />Human review stays in the loop</div>
        {developer && <div className="sp-ai-cards">{aiProjects.filter((project) => project.link).map((project) => <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">{project.title} <ArrowUpRight size={13} className="inline" aria-hidden="true" /><small>In development · View presentation</small></a>)}</div>}
      </div>
      <div className="sp-panel">
        <div className="sp-panel-bar"><span><Bot size={15} aria-hidden="true" />{developer ? "developer.copilot" : "operations.assistant"}</span><span>EXAMPLE / NOT LIVE AI</span></div>
        <div className="sp-ai-panel">
          <div className="sp-filter-group" role="group" aria-label="AI workflow examples">{examples.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} aria-controls="ai-example" onClick={() => setSelected(index)}>{item.label}</button>)}</div>
          <div id="ai-example" aria-live="polite">
            <div className="sp-ai-message" data-kind="prompt"><small>Example prompt</small><p>{example.prompt}</p></div>
            <div className="sp-ai-message"><small>Illustrative response</small><p>{example.response}</p></div>
            <div className="sp-terminal-line">{example.output}</div>
          </div>
          <p className="sp-ai-note">Curated examples only. No prompts, code, or system logs are sent to an AI service by this page.</p>
        </div>
      </div>
    </section>
  )
}
