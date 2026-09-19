export type ProjectCategory = "web" | "systems" | "mobile" | "games"
export type ProjectFilter = ProjectCategory | "all" | "demo"
export type SectionId = "home" | "projects" | "about" | "skills" | "upcoming" | "contact"

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  label: string
  image: string
  banner?: string
  screenshots?: string[]
  description: string
  tags: string[]
  link: string
  aliases: string[]
}

export const profile = {
  name: "Elvin Manuel",
  email: "elvinlazmanuel@gmail.com",
  viber: { display: "(+63) 924-442-6231", number: "+639244426231" },
  github: "https://github.com/VenokM05/",
  linkedin: "https://www.linkedin.com/in/elvin-manuel-181940147/",
  resume: "/resume.pdf",
}

// Migrated from the edited mockup. This is the shared data source for the React grid and guide.
export const projects: Project[] = [
  {
    id: "papp", title: "PAPP Registration", category: "web", label: "Web application",
    image: "/papp-registration-preview.jpg",
    description: "Convention registration for BREATHE 2026, with online sign-up and participant information management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    link: "https://papp-registration.com/landing/", aliases: ["papp", "breathe", "convention"],
  },
  {
    id: "qr", title: "QR Code Generator", category: "web", label: "Web application",
    image: "/qrcode-generator-preview.jpg",
    description: "Custom QR codes for links and Wi-Fi networks, with logo integration for easy access to digital content.",
    tags: ["JavaScript", "PHP", "HTML/CSS", "QR Code", "Vue.js"],
    link: "https://qrcode.virtual-registration.com/", aliases: ["qr", "qrcode", "qr code"],
  },
  {
    id: "inventory", title: "Equipment Inventory", category: "systems", label: "Management system",
    image: "/inventory-system-preview.jpg",
    description: "Equipment tracking for Wildfire IT, bringing inventory, user authentication, and reporting into one place.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Next.js"],
    link: "https://inventory.wildfirexstream.com/login.php", aliases: ["inventory", "equipment", "wildfire"],
  },
  {
    id: "ultramega", title: "Ultra Mega Registration", category: "web", label: "Web application",
    image: "/ultramega-registration-preview.jpg",
    description: "An online event registration system with form validation and participant data management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    link: "https://ultramega.virtual-registration.com/", aliases: ["ultra", "ultramega", "mega"],
  },
  {
    id: "palawan", title: "Palawan Digital Passport", category: "mobile", label: "Mobile experience",
    image: "/palawan-passport-preview.jpg",
    description: "A mobile-based digital passport with authentication and secure access management for Palawan.",
    tags: ["PHP", "MySQL", "JavaScript", "Mobile", "Vue.js"],
    link: "https://40taonpalawan.com/login.php", aliases: ["palawan", "passport"],
  },
  {
    id: "viatris", title: "Viatris Virtual Registration", category: "games", label: "Interactive game",
    image: "/viatris-game-preview.jpg",
    description: "An interactive registration experience with game mechanics and user progression tracking.",
    tags: ["JavaScript", "HTML5", "CSS", "Game Mechanics", "Next.js"],
    link: "https://virtual-registration.com/startup/viatris-vr/", aliases: ["viatris"],
  },
  {
    id: "grab", title: "Grab Game", category: "games", label: "Interactive game",
    image: "/grab-game-preview.jpg",
    description: "A memory-based browser game combining JavaScript gameplay with an engaging interactive interface.",
    tags: ["JavaScript", "HTML5", "Game Development", "Interactive UI", "React"],
    link: "https://virtual-registration.com/startup/grab-game/", aliases: ["grab", "memory"],
  },
  {
    id: "mcdo", title: "McDonald's Game", category: "games", label: "Interactive game",
    image: "/mcdo-game-preview.jpg",
    description: "A responsive slime-stacking game for McDonald's, built with JavaScript-based gameplay.",
    tags: ["JavaScript", "HTML5", "Game Development", "Responsive Design", "Vue.js"],
    link: "https://virtual-registration.com/startup/mcdo-game/", aliases: ["mcdonald", "mcdonalds", "mcdonald's", "mcdo", "slime"],
  },
  {
    id: "ar", title: "AR Hunt", category: "games", label: "Augmented reality",
    image: "/ar-hunt-preview.jpg",
    description: "An augmented reality treasure hunt using marker-based tracking and interactive clues.",
    tags: ["JavaScript", "AR", "Marker Detection", "Interactive UI", "Next.js"],
    link: "https://virtual-registration.com/startup/ar-hunt/", aliases: ["ar", "ar hunt", "augmented reality", "treasure"],
  },
  {
    id: "rcbc", title: "RCBC Commitment Wall", category: "web", label: "Web application",
    image: "/rcbc-wall-preview.jpg",
    description: "An interactive digital commitment wall for RCBC, with fullscreen presentation and audience engagement.",
    tags: ["JavaScript", "HTML5", "Fullscreen", "Interactive UI", "React"],
    link: "https://virtual-registration.com/startup/rcbc/wall.php", aliases: ["rcbc", "commitment", "wall"],
  },
  {
    id: "loki", title: "Loki IDE", category: "systems", label: "AI-native IDE",
    image: "/loki.png",
    description: "An AI-native, local-first desktop IDE built with Electron. Features Monaco editor, integrated terminal, Git UI, autonomous AI agent with multi-step task execution, inline completions, and smart model routing across Qwen, DeepSeek, and Ollama.",
    tags: ["Electron", "React", "TypeScript", "AI/ML", "Node.js", "Monaco", "Ollama", "Git"],
    link: "https://pixlint.com/projects/norse/presentation-deck.html", aliases: ["loki", "ide", "editor", "norse"],
  },
  {
    id: "odin", title: "Odin Desktop", category: "systems", label: "Autonomous dev platform",
    image: "/odin.png",
    description: "An autonomous development desktop that evolves Loki IDE into a task-centric, agent-driven platform. Users bring ideas; Odin executes through intelligent agent collaboration, real-environment operation, and proactive assistance.",
    tags: ["Electron", "TypeScript", "AI Agents", "Local-first", "Task Automation", "Plugin SDK"],
    link: "https://pixlint.com/projects/norse/presentation-deck.html", aliases: ["odin", "desktop", "autonomous", "norse"],
  },
  {
    id: "travereels", title: "Travereels", category: "web", label: "Web application",
    image: "/travereels.png",
    description: "The ultimate social media platform for modern travelers who want to skip the hassle of trip planning. Powered by smart AI, Travereel delivers instant travel suggestions and tailored itineraries so you can spend less time searching and more time exploring. Connect with a global community, share your journeys, and unlock your next adventure in seconds.",
    tags: ["React", "Node.js", "TypeScript", "Tailwind"],
    link: "", aliases: ["travel", "ai", "journey", "search"],
  },
  {
    id: "snappy", title: "Snappy", category: "web", label: "Web application",
    image: "/snappy.png",
    description: "The digital photo booth app designed to turn everyday moments into instant, shareable memories. No lines, no waiting\u2014just pure fun.",
    tags: ["React", "Node.js", "TypeScript"],
    link: "", aliases: ["wedding", "photobooth", "digital", "birthday"],
  },
  {
    id: "queuing", title: "Queuing Management", category: "systems", label: "Management system",
    image: "/queuing.png",
    description: "Streamline your car show operations with an intelligent Queue Management System. Built specifically for automotive events, it seamlessly handles test drive bookings, walk-in inquiries, and VIP vehicle reservations. Replace crowded lines with a frictionless digital queue that keeps car enthusiasts engaged and captures high-value leads instantly.",
    tags: ["PHP", "Laravel", "MySQL"],
    link: "", aliases: ["queuing", "tracking", "car", "inquiry", "reservation"],
  },
  {
    id: "kojie", title: "Kojie-san", category: "games", label: "Interactive game",
    image: "/kojie.png",
    description: "An engaging, interactive digital matching game designed exclusively for the Kojie-san booth at the Watsons Expo. The activation drives high foot traffic and brand recall by challenging attendees to fast-paced product matching, seamlessly turning booth visitors into active consumers through gamified rewards.",
    tags: ["Unity"],
    link: "", aliases: ["interactive", "expo", "booth", "watsons", "game"],
  },
  {
    id: "nan-kid", title: "NAN Kid", category: "games", label: "Interactive game",
    image: "/nan.png",
    description: "An immersive dual-game activation created for NAN Kid to educate parents on early childhood nutrition. The experience features an Interactive History Wall that beautifully displays the brand\u2019s scientific legacy, alongside \u201CAmazing Match\u201D\u2014a gamified digital experience where users match premium ingredients to a designated glass of milk to reinforce product benefits in a fun, memorable way.",
    tags: ["Unity"],
    link: "", aliases: ["interactive", "expo", "booth", "game", "kid", "milk"],
  },
]

export const projectFilters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All work" }, { value: "demo", label: "Live Demo" },
  { value: "web", label: "Web apps" },
  { value: "systems", label: "Systems" }, { value: "mobile", label: "Mobile" },
  { value: "games", label: "Games & AR" },
]
export const skillGroups = [
  { title: "Frontend & design", icon: "</>", skills: ["React & Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "Responsive UI/UX"] },
  { title: "Backend & databases", icon: "{ }", skills: ["PHP & Node.js", "MySQL & PostgreSQL", "REST APIs", "Application workflows", "Data architecture"] },
  { title: "Game development", icon: "\u25B6", skills: ["C# & Unity", "Interactive game mechanics", "AR experiences", "HTML5 Canvas", "Browser-based games"] },
  { title: "Version control & collaboration", icon: "⎇", skills: ["Git & GitHub", "Branch management & code review", "Collaborative development workflows", "Repository management", "Team-based version control"] },
  { title: "IT & infrastructure", icon: "\u2699", skills: ["Hardware troubleshooting & maintenance", "Network administration & configuration", "System deployment & management", "IT support & security protocols", "Equipment lifecycle management", "Infrastructure optimization"] },
  { title: "AI & automation", icon: "\u26A1", skills: ["AI integration & LLM APIs", "Local AI with Ollama", "Autonomous agent patterns", "AI-driven developer tools", "Prompt engineering & workflows"] },
]
export const learningTopics = [
  { title: "AI Integration & LLM APIs", category: "AI / ML" },
  { title: "Local AI with Ollama", category: "Privacy-first" },
  { title: "Autonomous Agent Patterns", category: "AI Architecture" },
  { title: "AI-Driven Developer Tools", category: "Productivity" },
]

export interface TimelineEntry {
  year: string
  title: string
  description: string
  icon: string
}

export const careerTimeline: TimelineEntry[] = [
  { year: "2014", title: "Started Freelancing", description: "Took on small web projects, building the foundation in HTML, CSS, and JavaScript.", icon: "\u{1F680}" },
  { year: "2016", title: "Went Professional", description: "Transitioned to full-time software development, delivering enterprise web applications.", icon: "\u{1F4BC}" },
  { year: "2018", title: "IT Specialist Role", description: "Expanded into hardware, networking, and infrastructure management alongside software.", icon: "\u{1F5A5}\uFE0F" },
  { year: "2020", title: "Game Development", description: "Built interactive games and AR experiences for major brands using JavaScript and Unity.", icon: "\u{1F3AE}" },
  { year: "2023", title: "Full-Stack & Systems", description: "Delivered registration platforms, inventory systems, and digital passports at scale.", icon: "\u{1F310}" },
  { year: "Now", title: "AI-Powered Tools", description: "Learning AI and integrating it into personal projects \u2014 building Loki IDE and Odin Desktop, a Norse-forged AI development ecosystem.", icon: "\u{1F9E0}" },
]

export function filterProjects(items: Project[], category: ProjectFilter, search: string): Project[] {
  const query = search.trim().toLowerCase()
  const matchesCategory = category === "all"
    ? () => true
    : category === "demo"
      ? (p: Project) => p.link !== ""
      : (p: Project) => p.category === category
  return items.filter((project) => matchesCategory(project) &&
    [project.title, project.label, project.description, ...project.tags].join(" ").toLowerCase().includes(query))
}

// Brand marquee data
export type BrandCategory = "client" | "tech"

export interface BrandEntry {
  id: string
  name: string
  category: BrandCategory
  logo?: string
  url?: string
}

export const defaultBrands: BrandEntry[] = [
  { id: "b-rcbc", name: "RCBC", category: "client" },
  { id: "b-mcdo", name: "McDonald\u2019s", category: "client" },
  { id: "b-grab", name: "Grab", category: "client" },
  { id: "b-viatris", name: "Viatris", category: "client" },
  { id: "b-palawan", name: "Palawan", category: "client" },
  { id: "b-ultramega", name: "Ultra Mega", category: "client" },
  { id: "b-papp", name: "PAPP", category: "client" },
  { id: "b-travereels", name: "Travereels", category: "client" },
  { id: "b-snappy", name: "Snappy", category: "client" },
  { id: "b-mitsubishi", name: "Mitsubishi", category: "client" },
  { id: "b-baic", name: "BAIC", category: "client" },
  { id: "b-foton", name: "Foton", category: "client" },
  { id: "b-lynkco", name: "LYNK & CO", category: "client" },
  { id: "b-chery", name: "CHERY", category: "client" },
  { id: "b-kojie", name: "Kojie-San", category: "client" },
  { id: "b-nankid", name: "NAN Kid", category: "client" },
  { id: "b-hsbc", name: "HSBC", category: "client" },
  { id: "b-react", name: "React", category: "tech" },
  { id: "b-nextjs", name: "Next.js", category: "tech" },
  { id: "b-typescript", name: "TypeScript", category: "tech" },
  { id: "b-unity", name: "Unity", category: "tech" },
  { id: "b-electron", name: "Electron", category: "tech" },
  { id: "b-php", name: "PHP", category: "tech" },
  { id: "b-nodejs", name: "Node.js", category: "tech" },
]

// Pixel Interactive (Pixlint) business data
export interface PixlintService {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

export interface PixlintStat {
  value: string
  label: string
}

export const pixlintUrl = "https://pixlint.com"

export const pixlintServices: PixlintService[] = [
  {
    id: "photobooths",
    icon: "\uD83C\uDDE5",
    title: "Photobooths",
    description: "High-quality branded photo experiences with instant sharing, animated GIFs, and live gallery walls.",
    features: ["Custom branded overlays", "Instant print & digital sharing", "Live gallery wall display", "QR code delivery"],
  },
  {
    id: "minigames",
    icon: "\uD83C\uDFAE",
    title: "Mini Games",
    description: "Custom-branded event games designed to drive engagement, foot traffic, and brand recall.",
    features: ["Fully branded interface", "Leaderboard & scoring", "Touch, motion, or controller input", "Real-time engagement data"],
  },
  {
    id: "ai",
    icon: "\uD83E\uDD16",
    title: "AI Experiences",
    description: "AI-powered activations \u2014 face swap, AI art, real-time portrait generation, and personalized keepsakes.",
    features: ["AI portrait & avatar generation", "Real-time face transformation", "Instant digital delivery", "Cloud gallery per event"],
  },
  {
    id: "custom",
    icon: "\u2728",
    title: "Custom Packages",
    description: "Bespoke multi-experience combinations built around your event goals with dedicated project management.",
    features: ["Multi-experience combos", "Custom hardware setups", "Dedicated project manager", "Post-event analytics"],
  },
]

export const pixlintStats: PixlintStat[] = [
  { value: "100+", label: "Events Delivered" },
  { value: "50K+", label: "Participants Engaged" },
  { value: "4", label: "Experience Types" },
  { value: "100%", label: "Client Satisfaction" },
]
