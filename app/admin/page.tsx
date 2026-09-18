"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Plus, Edit, Trash2, LogOut, Image as ImageIcon, Link as LinkIcon, ToggleLeft, ToggleRight, RotateCcw, Shield, Search, X, Monitor } from "lucide-react"
import { projects as defaultProjects, type Project, type ProjectCategory } from "@/lib/portfolio-data"
import "./admin.css"

const ADMIN_PASSWORD = "admin123"

interface ProjectFormData {
  id: string
  title: string
  category: ProjectCategory
  label: string
  image: string
  banner: string
  screenshots: string[]
  description: string
  tags: string[]
  link: string
  linkEnabled: boolean
  aliases: string[]
}

const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web application",
  systems: "Management system",
  mobile: "Mobile experience",
  games: "Interactive game",
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<ProjectFormData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      loadProjects()
    }
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const notify = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type })
  }

  const loadProjects = () => {
    const stored = localStorage.getItem("portfolio_projects")
    if (stored) {
      try {
        setProjects(JSON.parse(stored))
      } catch {
        setProjects(defaultProjects)
        localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects))
      }
    } else {
      setProjects(defaultProjects)
      localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("admin_authenticated", "true")
      setLoginError("")
      loadProjects()
    } else {
      setLoginError("Invalid password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    router.push("/")
  }

  const handleDelete = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (confirm(`Delete "${project?.title}"? This cannot be undone.`)) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      localStorage.setItem("portfolio_projects", JSON.stringify(updated))
      notify(`"${project?.title}" deleted successfully`)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject({
      ...project,
      banner: project.banner ?? "",
      screenshots: project.screenshots ?? [],
      linkEnabled: project.link !== "",
    })
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: "",
      category: "web",
      label: categoryLabels.web,
      image: "",
      banner: "",
      screenshots: [],
      description: "",
      tags: [],
      link: "",
      linkEnabled: false,
      aliases: [],
    })
    setShowForm(true)
  }

  const handleSave = (formData: ProjectFormData) => {
    if (!formData.title.trim()) {
      notify("Title is required", "error")
      return
    }

    const project: Project = {
      id: formData.id,
      title: formData.title.trim(),
      category: formData.category,
      label: formData.label || categoryLabels[formData.category],
      image: formData.image || "/placeholder.jpg",
      banner: formData.banner || undefined,
      screenshots: formData.screenshots.length > 0 ? formData.screenshots : undefined,
      description: formData.description.trim(),
      tags: formData.tags,
      link: formData.linkEnabled ? formData.link : "",
      aliases: formData.aliases,
    }

    let updated: Project[]
    const exists = projects.find((p) => p.id === formData.id)
    if (exists) {
      updated = projects.map((p) => (p.id === formData.id ? project : p))
      notify(`"${project.title}" updated successfully`)
    } else {
      updated = [...projects, project]
      notify(`"${project.title}" added successfully`)
    }

    setProjects(updated)
    localStorage.setItem("portfolio_projects", JSON.stringify(updated))
    setShowForm(false)
    setEditingProject(null)
  }

  const handleReset = () => {
    if (confirm("Reset all projects to default? This will remove all your custom changes.")) {
      setProjects(defaultProjects)
      localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects))
      notify("Projects reset to defaults")
    }
  }

  const filteredProjects = searchQuery.trim()
    ? projects.filter((p) =>
        [p.title, p.label, p.category, ...p.tags].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card"
        >
          <div className="admin-login-icon">
            <Shield size={28} />
          </div>
          <h1>Admin Access</h1>
          <p className="admin-login-subtitle">Enter password to manage your portfolio projects</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError("") }}
                className={loginError ? "admin-input-error" : ""}
                placeholder="Enter admin password"
                autoFocus
                required
              />
              {loginError && <span className="admin-error">{loginError}</span>}
            </div>
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-full">
              <Shield size={16} />
              Login
            </button>
          </form>
          <button onClick={() => router.push("/")} className="admin-login-back">
            <ArrowLeft size={14} /> Back to portfolio
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`admin-notification admin-notification-${notification.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <button onClick={() => router.push("/")} className="admin-back-btn" title="Back to portfolio">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1>Project Admin</h1>
              <span className="admin-header-count">{projects.length} projects</span>
            </div>
          </div>
          <div className="admin-header-right">
            <button onClick={handleReset} className="admin-btn admin-btn-quiet" title="Reset to defaults">
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button onClick={handleLogout} className="admin-btn admin-btn-danger">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="admin-content">
        {/* Toolbar */}
        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button onClick={handleAddNew} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {/* Project List */}
        <div className="admin-project-list">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="admin-project-card"
              >
                <div className="admin-project-thumb">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="admin-project-info">
                  <h3>{project.title}</h3>
                  <div className="admin-project-meta">
                    <span className={`admin-badge admin-badge-${project.category}`}>{project.label}</span>
                    {project.link ? (
                      <span className="admin-badge admin-badge-link">
                        <LinkIcon size={10} /> Link ON
                      </span>
                    ) : (
                      <span className="admin-badge admin-badge-no-link">
                        <LinkIcon size={10} /> Link OFF
                      </span>
                    )}
                    <span className="admin-badge admin-badge-tags">{project.tags.length} tags</span>
                    {(project.screenshots?.length ?? 0) > 0 && (
                      <span className="admin-badge admin-badge-screenshots">{project.screenshots!.length} screenshots</span>
                    )}
                    {project.banner && (
                      <span className="admin-badge admin-badge-banner">
                        <Monitor size={10} /> Banner
                      </span>
                    )}
                  </div>
                </div>
                <div className="admin-project-actions">
                  <button onClick={() => handleEdit(project)} className="admin-btn admin-btn-icon" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="admin-btn admin-btn-icon admin-btn-icon-danger" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="admin-empty">
              <ImageIcon size={32} />
              <p>{searchQuery ? "No projects match your search" : "No projects yet"}</p>
              {!searchQuery && (
                <button onClick={handleAddNew} className="admin-btn admin-btn-primary">
                  <Plus size={16} /> Add your first project
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && editingProject && (
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingProject(null) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Project Form Modal ─── */

interface ProjectFormProps {
  project: ProjectFormData
  onSave: (project: ProjectFormData) => void
  onCancel: () => void
}

function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(project)
  const [tagsInput, setTagsInput] = useState(project.tags.join(", "))
  const [aliasesInput, setAliasesInput] = useState(project.aliases.join(", "))

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return }
    const dataUrl = await readFileAsBase64(file)
    setFormData({ ...formData, image: dataUrl })
    e.target.value = ""
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert("Banner image must be under 5MB"); return }
    const dataUrl = await readFileAsBase64(file)
    setFormData({ ...formData, banner: dataUrl })
    e.target.value = ""
  }

  const handleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const oversized = files.find((f) => f.size > 5 * 1024 * 1024)
    if (oversized) { alert("Each image must be under 5MB"); return }
    const dataUrls = await Promise.all(files.map(readFileAsBase64))
    setFormData({ ...formData, screenshots: [...formData.screenshots, ...dataUrls] })
    e.target.value = ""
  }

  const removeScreenshot = (index: number) => {
    setFormData({
      ...formData,
      screenshots: formData.screenshots.filter((_, i) => i !== index),
    })
  }

  const handleCategoryChange = (cat: ProjectCategory) => {
    setFormData({ ...formData, category: cat, label: categoryLabels[cat] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    const aliases = aliasesInput.split(",").map((a) => a.trim()).filter(Boolean)
    onSave({ ...formData, tags, aliases })
  }

  const isEditing = !!project.title

  return (
    <motion.div
      className="admin-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="admin-modal admin-modal-wide"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h2>{isEditing ? "Edit" : "Add"} Project</h2>
          <button onClick={onCancel} className="admin-btn admin-btn-icon" aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {/* Title */}
          <div className="admin-field">
            <label>Title <span className="admin-required">*</span></label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project name"
              required
              autoFocus
            />
          </div>

          {/* Category + Label */}
          <div className="admin-row">
            <div className="admin-field admin-field-grow">
              <label>Category</label>
              <div className="admin-category-grid">
                {(Object.keys(categoryLabels) as ProjectCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`admin-category-btn${formData.category === cat ? " active" : ""}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-field">
              <label>Label</label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Web application"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="admin-field">
            <label>Card Thumbnail <span className="admin-hint-inline">small image shown on project cards</span></label>
            {formData.image && !formData.image.startsWith("/placeholder") && (
              <div className="admin-image-preview admin-image-preview-sm">
                <img src={formData.image} alt="Thumbnail preview" />
              </div>
            )}
            <div className="admin-file-input">
              <ImageIcon size={20} />
              <span>{formData.image ? "Change thumbnail" : "Upload thumbnail"}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleThumbnailUpload} />
            </div>
          </div>

          {/* Banner */}
          <div className="admin-field">
            <label>Banner Image <span className="admin-hint-inline">wide hero image for project detail modal (16:9 recommended)</span></label>
            {formData.banner && (
              <div className="admin-image-preview admin-image-preview-banner">
                <img src={formData.banner} alt="Banner preview" />
                <button
                  type="button"
                  className="admin-image-remove"
                  onClick={() => setFormData({ ...formData, banner: "" })}
                  aria-label="Remove banner"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <div className="admin-file-input">
              <Monitor size={20} />
              <span>{formData.banner ? "Change banner" : "Upload banner image"}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleBannerUpload} />
            </div>
            <p className="admin-hint">Falls back to the card thumbnail if not provided.</p>
          </div>

          {/* Screenshots */}
          <div className="admin-field">
            <label>Screenshots <span className="admin-hint-inline">multiple images (up to 10)</span></label>
            {formData.screenshots.length > 0 && (
              <div className="admin-screenshots-grid">
                {formData.screenshots.map((ss, index) => (
                  <div key={index} className="admin-screenshot-thumb">
                    <img src={ss} alt={`Screenshot ${index + 1}`} />
                    <button
                      type="button"
                      className="admin-screenshot-remove"
                      onClick={() => removeScreenshot(index)}
                      aria-label={`Remove screenshot ${index + 1}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {formData.screenshots.length < 10 && (
              <div className="admin-file-input">
                <ImageIcon size={20} />
                <span>{formData.screenshots.length > 0 ? "Add more screenshots" : "Upload screenshots"}</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleScreenshotsUpload} />
              </div>
            )}
            <p className="admin-hint">JPEG, PNG, or WebP. Max 5MB each. Stored as base64 in browser.</p>
          </div>

          {/* Description */}
          <div className="admin-field">
            <label>Description <span className="admin-required">*</span></label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the project..."
              rows={3}
              required
            />
          </div>

          {/* Tags */}
          <div className="admin-field">
            <label>Tags <span className="admin-hint-inline">comma-separated</span></label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Next.js, TypeScript"
            />
          </div>

          {/* Aliases */}
          <div className="admin-field">
            <label>Search Aliases <span className="admin-hint-inline">comma-separated, for search</span></label>
            <input
              type="text"
              value={aliasesInput}
              onChange={(e) => setAliasesInput(e.target.value)}
              placeholder="papp, breathe, convention"
            />
          </div>

          {/* Demo Link Toggle */}
          <div className="admin-field admin-link-section">
            <div className="admin-link-toggle">
              <label>Demo Link</label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, linkEnabled: !formData.linkEnabled })}
                className="admin-toggle-btn"
                aria-pressed={formData.linkEnabled}
              >
                {formData.linkEnabled
                  ? <><ToggleRight size={22} className="admin-toggle-on" /><span>Enabled</span></>
                  : <><ToggleLeft size={22} className="admin-toggle-off" /><span>Disabled</span></>
                }
              </button>
            </div>
            {formData.linkEnabled && (
              <motion.input
                type="url"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
              />
            )}
          </div>

          {/* Actions */}
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-grow">
              {isEditing ? "Save Changes" : "Add Project"}
            </button>
            <button type="button" onClick={onCancel} className="admin-btn admin-btn-quiet">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
