"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { learningTopics, profile, skillGroups, type SectionId } from "@/lib/portfolio-data"

interface PortfolioSectionsProps {
  target?: string
  onNavigate: (section: SectionId) => void
  onContact: (trigger: HTMLElement) => void
}

export function PortfolioIntro() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <motion.div
      className="pf-container pf-intro"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
    >
      <p><strong>Thoughtful interfaces. Practical solutions.</strong><br />Web development, UI/UX, and interactive experiences.</p>
      <div className="pf-strip-links">
        <a className="pf-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub ↗</a>
        <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn ↗</a>
      </div>
    </motion.div>
  )
}

export function PortfolioSections({ target, onNavigate, onContact }: PortfolioSectionsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const highlight = (id: string) => target === id ? " pf-tour-target" : ""
  const transition = { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" as const }

  return (
    <>
      <section className="pf-container pf-section" id="about" aria-labelledby="about-title">
        <motion.div
          className="pf-about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <div className="pf-about-copy">
            <div className="pf-eyebrow">The person behind the pixels</div>
            <h2 id="about-title" tabIndex={-1}>Curious by nature.<br />Builder by choice.</h2>
            <p>I&apos;m Elvin Manuel, a software engineer who enjoys connecting design and development. I build web applications with a focus on clear interfaces and maintainable code.</p>
            <p>From event registration to interactive games, I like making complex ideas feel simple to use.</p>
            <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="More about my background on LinkedIn (opens in a new tab)">More about my background ↗</a>
          </div>
          <div className={`pf-skill-columns${highlight("skills")}`} id="skills" tabIndex={-1} role="region" aria-label="Development skills">
            {skillGroups.map((group, index) => (
              <motion.article
                className="pf-skill-group"
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: index * 0.1 }}
              >
                <span className="pf-skill-icon" aria-hidden="true">{group.icon}</span>
                <h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
      <section className="pf-container pf-section" id="upcoming" aria-labelledby="upcoming-title">
        <motion.div
          className={`pf-heading${highlight("upcoming-heading")}`}
          id="upcoming-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <div><div className="pf-eyebrow">Always exploring</div><h2 id="upcoming-title" tabIndex={-1}>The next chapter</h2></div>
          <p>A space for upcoming builds and the ideas I&apos;m learning about along the way.</p>
        </motion.div>
        <motion.div
          className="pf-upcoming-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
        >
          <article className="pf-upcoming-card">
            <span className="pf-tag">Upcoming · To be announced</span><h3>Room for what&apos;s next.</h3>
            <p>New project details will appear here when they&apos;re ready to share. No release date has been announced.</p>
            <a className="pf-link" href="#contact" onClick={(event) => { event.preventDefault(); onNavigate("contact") }}>Have an idea we could build? →</a>
          </article>
          <article className="pf-upcoming-card pf-learning" id="learning">
            <h3>Currently exploring</h3><p>Learning topics, not announced project releases.</p>
            <ul className="pf-learning-list">{learningTopics.map((topic) => <li key={topic.title}>{topic.title}<span>{topic.category}</span></li>)}</ul>
          </article>
        </motion.div>
      </section>
      <motion.section
        className={`pf-container pf-contact${highlight("contact")}`}
        id="contact"
        aria-labelledby="contact-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div>
          <div className="pf-eyebrow">Your next idea starts with a hello</div>
          <h2 id="contact-title" tabIndex={-1}>Let&apos;s build something<br />worth exploring.</h2>
          <p>Have a project in mind or want to talk about my work?<br />I&apos;d love to hear from you.</p>
        </div>
        <div className="pf-contact-actions">
          <button className="pf-btn pf-btn-light" type="button" onClick={(event) => onContact(event.currentTarget)} aria-haspopup="dialog">Send a message ↗</button>
          <a className="pf-link" href={`mailto:${profile.email}`}>Email me directly ↗</a>
          <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View professional profile on LinkedIn (opens in a new tab)">View professional profile ↗</a>
          <small>Email opens your mail app.</small>
        </div>
      </motion.section>
    </>
  )
}
