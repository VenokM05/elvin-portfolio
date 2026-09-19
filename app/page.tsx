"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ContentRow } from "@/components/content-row"
import { Footer } from "@/components/footer"
import { PortfolioIntro, PortfolioSections } from "@/components/portfolio-sections"
import { PortfolioDialog, type PortfolioModal } from "@/components/portfolio-dialog"
import { PortfolioTour } from "@/components/portfolio-tour"
import { WelcomeModal } from "@/components/welcome-modal"
import { ScrollToTop } from "@/components/scroll-to-top"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ScreenshotViewer } from "@/components/screenshot-viewer"
import { BrandMarquee } from "@/components/brand-marquee"
import { PixlintSection } from "@/components/pixlint-section"
import { projects, type Project, type ProjectFilter, type SectionId } from "@/lib/portfolio-data"
import { tourSteps, type GuideAction } from "@/lib/portfolio-guide"

export default function Home() {
  const [category, setCategory] = useState<ProjectFilter>("all")
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState<PortfolioModal | null>(null)
  const [tourIndex, setTourIndex] = useState<number | null>(null)
  const [screenshotProject, setScreenshotProject] = useState<Project | null>(null)
  const [projectsList, setProjectsList] = useState<Project[]>(projects)
  const launcher = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const afterCloseAction = useRef<(() => void) | null>(null)
  const dialogOpen = useRef(false)
  const restoreTourFocus = useRef(false)
  const target = tourIndex === null ? undefined : tourSteps[tourIndex].target

  const loadProjectsFromStorage = useCallback(() => {
    const stored = localStorage.getItem("portfolio_projects")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Project[]
        setProjectsList((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(parsed)) return parsed
          return prev
        })
      } catch (e) {
        console.error("Failed to parse stored projects:", e)
      }
    }
  }, [])

  // URL-based deep links: read ?category= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category") as ProjectFilter | null
    const q = params.get("q") ?? ""
    if (cat && ["all", "demo", "web", "systems", "mobile", "games"].includes(cat)) {
      setCategory(cat)
      setQuery(q)
    }
  }, [])

  useEffect(() => {
    // Load on mount
    loadProjectsFromStorage()

    // Re-sync when page becomes visible (navigating back from /admin)
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") loadProjectsFromStorage()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    // Re-sync on pageshow (back/forward navigation)
    const onPageShow = () => loadProjectsFromStorage()
    window.addEventListener("pageshow", onPageShow)

    // Sync across tabs when admin edits in another tab
    const onStorage = (e: StorageEvent) => {
      if (e.key === "portfolio_projects") loadProjectsFromStorage()
    }
    window.addEventListener("storage", onStorage)

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pageshow", onPageShow)
      window.removeEventListener("storage", onStorage)
    }
  }, [loadProjectsFromStorage])

  useEffect(() => {
    if (tourIndex === null && restoreTourFocus.current) {
      restoreTourFocus.current = false
      launcher.current?.focus({ preventScroll: true })
    }
  }, [tourIndex])

  const filter = (nextCategory: ProjectFilter, nextQuery: string) => { setCategory(nextCategory); setQuery(nextQuery) }
  const navigate = useCallback((section: SectionId) => {
    setTourIndex(null)
    const element = document.getElementById(section)
    const heading = element?.querySelector<HTMLElement>("h1, h2") ?? element
    heading?.focus({ preventScroll: true })
    element?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })
    window.history.replaceState(null, "", `#${section}`)
  }, [])
  const startTour = () => { filter("all", ""); setTourIndex(0) }
  const endTour = useCallback(() => { restoreTourFocus.current = true; setTourIndex(null) }, [])
  const viewScreenshot = (project: Project) => setScreenshotProject(project)
  const closeScreenshot = () => setScreenshotProject(null)

  const openModal = (next: PortfolioModal, trigger: HTMLElement) => {
    setTourIndex(null)
    opener.current = trigger
    afterCloseAction.current = null
    dialogOpen.current = true
    setModal(next)
  }
  const closeModal = () => { dialogOpen.current = false; setModal(null) }
  const afterClose = useCallback(() => {
    if (dialogOpen.current) return
    const action = afterCloseAction.current
    afterCloseAction.current = null
    if (action) action()
    else {
      const previous = opener.current
      const destination = previous?.isConnected && previous.getClientRects().length ? previous : launcher.current
      destination?.focus({ preventScroll: true })
    }
  }, [])
  const guideAction = (action: GuideAction) => {
    if (action.kind === "project") {
      const project = projectsList.find((item) => item.id === action.projectId)
      if (project) setModal({ kind: "project", project })
    } else if (action.kind === "resume") setModal({ kind: "resume" })
    else {
      if (action.kind === "navigate") {
        if (action.section === "projects") filter(action.category ?? "all", action.query ?? "")
        afterCloseAction.current = () => navigate(action.section)
      } else afterCloseAction.current = startTour
      closeModal()
    }
  }

  return (
    <div className="portfolio" data-touring={tourIndex !== null}>
      <a className="pf-skip" href="#main" onClick={() => setTourIndex(null)}>Skip to content</a>
      <Navigation onNavigate={navigate} onResume={(trigger) => openModal({ kind: "resume" }, trigger)} />
      <main id="main" tabIndex={-1}>
        <Hero onNavigate={navigate} onStartTour={startTour} onSelectProject={(project, trigger) => openModal({ kind: "project", project }, trigger)} highlighted={target === "hero-copy"} />
        <PortfolioIntro />
        <ContentRow items={projectsList} category={category} query={query} onFilter={filter}
          onSelect={(project, trigger) => openModal({ kind: "project", project }, trigger)}
          onViewScreenshot={viewScreenshot} highlighted={target === "projects-heading"} />
        <BrandMarquee />
        <PixlintSection />
        <PortfolioSections target={target} onNavigate={navigate} onContact={(trigger) => openModal({ kind: "contact" }, trigger)} />
      </main>
      <Footer onNavigate={navigate} />
      {tourIndex === null && (
        <button ref={launcher} type="button" id="guide-launcher" className="pf-btn pf-btn-primary pf-guide-launcher"
          aria-haspopup="dialog" onClick={(event) => openModal({ kind: "guide" }, event.currentTarget)}>
          <MessageCircle size={20} aria-hidden="true" />Need a guide?
        </button>
      )}
      <PortfolioDialog modal={modal} onClose={closeModal} onAfterClose={afterClose} onGuideAction={guideAction} />
      <ScreenshotViewer project={screenshotProject} onClose={closeScreenshot} />
      {tourIndex !== null && <PortfolioTour index={tourIndex} onChange={setTourIndex} onEnd={endTour} />}
      <WelcomeModal onStartTour={startTour} />
      <ScrollToTop />
      <KeyboardShortcuts onStartTour={startTour} onNavigate={(section) => navigate(section as SectionId)} />
    </div>
  )
}
