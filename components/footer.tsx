"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Facebook, ArrowUpRight } from "lucide-react"
import { profile, type SectionId } from "@/lib/portfolio-data"

const socialLinks = [
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: "https://facebook.com/VenokM", label: "Facebook", icon: Facebook },
]

export function Footer({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  return (
    <footer className="pf-container pf-footer-enhanced">
      <div className="pf-footer-top">
        <div className="pf-footer-brand">
          <span className="pf-footer-brand-mark" aria-hidden="true">E</span>
          <div>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Elvin Manuel on LinkedIn (opens in a new tab)">
              <strong>{profile.name}</strong>
            </a>
            <span>Software Engineer & IT Specialist</span>
          </div>
        </div>
        <div className="pf-footer-status">
          <span className="pf-footer-status-dot" />
          <span>Available for opportunities</span>
        </div>
      </div>

      <div className="pf-footer-middle">
        <nav className="pf-footer-nav" aria-label="Footer navigation">
          <h4>Explore</h4>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate("home") }}>Home</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate("projects") }}>Projects</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("about") }}>About & Skills</a></li>
            <li><a href="#timeline" onClick={(e) => { e.preventDefault(); onNavigate("timeline" as SectionId) }}>Timeline</a></li>
            <li><a href="#upcoming" onClick={(e) => { e.preventDefault(); onNavigate("upcoming") }}>What&apos;s Next</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate("contact") }}>Contact</a></li>
          </ul>
        </nav>
        <div className="pf-footer-social">
          <h4>Connect</h4>
          <div className="pf-footer-social-links">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="pf-footer-social-link"
                aria-label={`${label} (opens in a new tab)`}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
                <ArrowUpRight size={12} className="pf-footer-social-arrow" aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="pf-footer-bottom">
        <div>&copy; {new Date().getFullYear()} <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Elvin Manuel on LinkedIn (opens in a new tab)">{profile.name}</a>. Built with care.</div>
        <a href="#home" onClick={(event) => { event.preventDefault(); onNavigate("home") }} className="pf-footer-top-link">
          Back to top <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
