import { learningTopics, profile, projects, skillGroups, type ProjectCategory, type ProjectFilter, type SectionId } from "./portfolio-data"

export type GuideAction =
  | { kind: "navigate"; section: SectionId; category?: ProjectFilter; query?: string }
  | { kind: "project"; projectId: string }
  | { kind: "tour" }
  | { kind: "resume" }
export interface GuideReply { text: string; action?: GuideAction; label?: string }
export type GuideTopic = "projects" | "skills" | "upcoming" | "contact"

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
const contains = (text: string, term: string) => ` ${normalize(text)} `.includes(` ${normalize(term)} `)
const navigate = (text: string, label: string, section: SectionId, category?: ProjectFilter, query?: string): GuideReply =>
  ({ text, label, action: { kind: "navigate", section, category, query } })

// Pure, deterministic answers based only on the portfolio. No remote AI or chat storage.
export function answerPortfolioQuestion(question: string, topic?: GuideTopic): GuideReply {
  const text = question.trim().slice(0, 300)
  if (topic === "upcoming" || /\b(upcoming|incoming|future|soon|learning|rust|generative)\b|\bnext\b(?![.\s-]*js\b)/i.test(text)) {
    return navigate(`The next chapter is reserved for upcoming work; specific projects and dates haven't been provided yet. Learning topics: ${learningTopics.map((item) => item.title).join(", ")}. These are explorations, not announced products.`, "See what's next →", "upcoming")
  }
  if (/\b(resume|cv)\b/i.test(text)) {
    return { text: "Open Resume & Profile to download the resume when available, or view Elvin's professional history on LinkedIn.", label: "Open resume & profile →", action: { kind: "resume" } }
  }
  if (topic === "contact" || /\b(contact|email|hire|hiring|reach|collaborat\w*|linkedin)\b/i.test(text)) {
    return navigate(`Email Elvin at ${profile.email}, use the contact form, or explore his LinkedIn profile. The contact section links to these options.`, "Go to contact →", "contact")
  }
  if (topic === "skills" || /\b(skill\w*|stack|experience|who|background)\b|\babout\s+(elvin|you|the developer)\b/i.test(text)) {
    return navigate(`Elvin's listed skills include ${skillGroups.flatMap((group) => group.skills).join(", ")}.`, "Explore skills →", "skills")
  }
  if (/\b(tour|guide|start|help)\b/i.test(text)) {
    return { text: "Let's take a five-stop tour: introduction, projects, skills, upcoming work, and contact. You can go back or leave at any time.", label: "Start my tour →", action: { kind: "tour" } }
  }
  const project = projects.find((item) => item.aliases.some((alias) => contains(text, alias)))
  if (project) {
    return { text: `${project.title}: ${project.description}\nTech: ${project.tags.join(", ")}.`, label: "Open project details →", action: { kind: "project", projectId: project.id } }
  }
  const technology = [...new Set(projects.flatMap((item) => item.tags))].find((tag) => contains(text, tag))
  if (technology) {
    const matches = projects.filter((item) => item.tags.includes(technology))
    return navigate(`${technology} appears in: ${matches.map((item) => item.title).join(", ")}.`, `Browse ${technology} projects →`, "projects", "all", technology)
  }
  const groups: { words: RegExp; category: ProjectCategory; label: string }[] = [
    { words: /\b(game\w*|interactive|play)\b/i, category: "games", label: "Games & AR" },
    { words: /\b(mobile|phone)\b/i, category: "mobile", label: "Mobile experiences" },
    { words: /\b(system\w*|dashboard\w*)\b/i, category: "systems", label: "Management systems" },
    { words: /\b(web|registration|website\w*)\b/i, category: "web", label: "Web apps" },
  ]
  const group = groups.find((item) => item.words.test(text))
  if (group) {
    const matches = projects.filter((item) => item.category === group.category)
    return navigate(`${group.label}: ${matches.map((item) => item.title).join(", ")}. Use Explore project for details.`, `Browse ${group.label.toLowerCase()} →`, "projects", group.category)
  }
  if (topic === "projects" || /\b(project\w*|work|portfolio|build\w*)\b/i.test(text)) {
    return navigate(`There are ${projects.length} projects to explore, including registration systems, a QR generator, equipment inventory, a digital passport, interactive games, AR Hunt, and a commitment wall. Filter by type or technology.`, "Show all projects →", "projects", "all")
  }
  return { text: "I only have information listed in this portfolio. Try a project name like 'AR Hunt', a technology like 'PHP', or ask about skills, upcoming work, contact, or a tour." }
}

export const tourSteps: { section: SectionId; target: string; title: string; text: string }[] = [
  { section: "home", target: "hero-copy", title: "Meet Elvin", text: "A software engineer and IT specialist with 10+ years of experience \u2014 from freelancing in 2014 to building enterprise systems today. Let\u2019s explore his work." },
  { section: "projects", target: "projects-heading", title: "Browse the projects", text: `Explore all ${projects.length} projects across web apps, systems, mobile, and games. Filter by category or search by technology like PHP, React, or Unity.` },
  { section: "skills", target: "skills", title: "See the full skill set", text: "Four domains: frontend & design, backend & databases, game development with C# and Unity, plus IT infrastructure \u2014 hardware, networking, and security." },
  { section: "upcoming", target: "upcoming-heading", title: "What\u2019s next", text: "See where things are headed \u2014 Unity multiplayer, advanced C#, cloud pipelines, and AR/VR spatial computing. Active learning, not announced releases." },
  { section: "contact", target: "contact", title: "Start a conversation", text: "Have a project idea or want to collaborate? Send a message, drop an email, or connect on LinkedIn. Thanks for exploring Elvin\u2019s portfolio!" },
]
