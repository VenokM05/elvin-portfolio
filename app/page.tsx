"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ContentRow } from "@/components/content-row"
import { Footer } from "@/components/footer"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ContactModal } from "@/components/contact-modal"

const PROJECTS = [
  {
    id: "1",
    title: "PAPP Registration",
    category: "Web App",
    image: "/papp-registration-preview.jpg",
    description:
      "Annual convention registration system for BREATHE 2026 - 33rd Annual Convention, featuring online registration and participant information management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    isTop10: true,
    rank: 1,
    link: "https://papp-registration.com/landing/",
  },
  {
    id: "2",
    title: "QR Code Generator",
    category: "Web App",
    image: "/qrcode-generator-preview.jpg",
    description:
      "Customizable QR code generator with support for links, Wi-Fi networks, and logo integration, providing easy access to digital content.",
    tags: ["JavaScript", "PHP", "HTML/CSS", "QR Code", "Vue.js"],
    isTop10: true,
    rank: 2,
    link: "https://qrcode.virtual-registration.com/",
  },
  {
    id: "3",
    title: "Equipment Inventory",
    category: "Management System",
    image: "/inventory-system-preview.jpg",
    description: "Equipment inventory management system for Wildfire IT, featuring equipment tracking, user authentication, and reporting capabilities.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Next.js"],
    isTop10: true,
    rank: 3,
    link: "https://inventory.wildfirexstream.com/login.php",
  },
  {
    id: "4",
    title: "Ultra Mega Registration",
    category: "Web App",
    image: "/ultramega-registration-preview.jpg",
    description: "Online registration system for Ultra Mega events with comprehensive form validation and user data management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    isTop10: true,
    rank: 4,
    link: "https://ultramega.virtual-registration.com/",
  },
  {
    id: "5",
    title: "Palawan Digital Passport",
    category: "Mobile App",
    image: "/palawan-passport-preview.jpg",
    description: "Digital passport system for Palawan with mobile-based authentication and secure access management.",
    tags: ["PHP", "MySQL", "JavaScript", "Mobile", "Vue.js"],
    isTop10: true,
    rank: 5,
    link: "https://40taonpalawan.com/login.php",
  },
  {
    id: "6",
    title: "Viatris Virtual Registration",
    category: "Interactive Game",
    image: "/viatris-game-preview.jpg",
    description: "Interactive virtual registration game for Viatris with engaging mechanics and user progression tracking.",
    tags: ["JavaScript", "HTML5", "CSS", "Game Mechanics", "Next.js"],
    isTop10: true,
    rank: 6,
    link: "https://virtual-registration.com/startup/viatris-vr/",
  },
  {
    id: "7",
    title: "Grab Game",
    category: "Interactive Game",
    image: "/grab-game-preview.jpg",
    description: "Engaging memory-based game with JavaScript implementation and interactive gameplay mechanics.",
    tags: ["JavaScript", "HTML5", "Game Development", "Interactive UI", "React"],
    isTop10: true,
    rank: 7,
    link: "https://virtual-registration.com/startup/grab-game/",
  },
  {
    id: "8",
    title: "McDonald's Game",
    category: "Interactive Game",
    image: "/mcdo-game-preview.jpg",
    description: "Slime stacking game for McDonald's with JavaScript-based gameplay and responsive design.",
    tags: ["JavaScript", "HTML5", "Game Development", "Responsive Design", "Vue.js"],
    isTop10: true,
    rank: 8,
    link: "https://virtual-registration.com/startup/mcdo-game/",
  },
  {
    id: "9",
    title: "AR Hunt",
    category: "AR Application",
    image: "/ar-hunt-preview.jpg",
    description: "Augmented reality treasure hunt application with marker-based tracking and interactive clues.",
    tags: ["JavaScript", "AR", "Marker Detection", "Interactive UI", "Next.js"],
    isTop10: true,
    rank: 9,
    link: "https://virtual-registration.com/startup/ar-hunt/",
  },
  {
    id: "10",
    title: "RCBC Commitment Wall",
    category: "Web App",
    image: "/rcbc-wall-preview.jpg",
    description: "Digital commitment wall for RCBC with fullscreen mode and interactive user engagement features.",
    tags: ["JavaScript", "HTML5", "Fullscreen", "Interactive UI", "React"],
    isTop10: true,
    rank: 10,
    link: "https://virtual-registration.com/startup/rcbc/wall.php",
  },
]

const EXPERIENCE = [
  { id: "e1", title: "Full Stack Developer", category: "Tech Innovations", image: "/tech-office.jpg" },
  { id: "e2", title: "Frontend Specialist", category: "Web Solutions", image: "/startup-office.jpg" },
  { id: "e3", title: "UI/UX Designer", category: "Creative Studio", image: "/design-studio.jpg" },
  { id: "e4", title: "Backend Engineer", category: "Data Systems", image: "/ai-innovation.jpg" },
]

// Added skills data for frontend and backend
const FRONTEND_SKILLS = [
  { name: "React, Next JS", level: 75 },
  { name: "TypeScript", level: 75 },
  { name: "Tailwind CSS", level: 90 },
  { name: "UI/UX", level: 93 },
  { name: "Responsive Design", level: 88 },
]

const BACKEND_SKILLS = [
  { name: "Node.js", level: 88 },
  { name: "PostgreSQL", level: 73 },
  { name: "REST APIs", level: 90 },
  { name: "Docker", level: 76 },
  { name: "PHP", level: 94 },
]

const LEARNING_PROGRESS = [
  {
    id: "l1",
    title: "Advanced System Design",
    category: "Architecture",
    image: "/blueprint.png",
    progress: 75,
  },
  { id: "l2", title: "Rust for Performance", category: "Systems", image: "/weathered-metal.png", progress: 40 },
  { id: "l3", title: "Generative AI Patterns", category: "AI/ML", image: "/human-brain.png", progress: 90 },
]

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <Hero />

        {/* Rows with negative margin top to overlap the hero fade */}
        <div className="relative z-20 -mt-20 space-y-4 pb-20">
          <section id="projects">
            <ContentRow title="Trending Now: Projects" items={PROJECTS} />
          </section>

          <section id="learning">
            <ContentRow
              title="Continue Learning"
              items={LEARNING_PROGRESS.map((item) => ({
                ...item,
                // Force a progress indicator in the RowCard for these items
                isLearning: true,
              }))}
            />
          </section>

          <section id="experience">
            <ContentRow title="Professional Experience" items={EXPERIENCE} />
          </section>
        </div>

        {/* Skills section */}
        <section id="skills" className="py-24 px-4 md:px-8 lg:px-16 bg-muted/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Frontend Skills */}
              <div className="animate-fade-in delay-100">
                <h3 className="text-xl font-bold mb-6 text-primary">Frontend Development</h3>
                <div className="space-y-6">
                  {FRONTEND_SKILLS.map((skill, index) => (
                    <div key={skill.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out rounded-full skill-bar"
                          style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1 + 0.3}s` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="animate-fade-in delay-200">
                <h3 className="text-xl font-bold mb-6 text-primary">Backend Development</h3>
                <div className="space-y-6">
                  {BACKEND_SKILLS.map((skill, index) => (
                    <div key={skill.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out rounded-full skill-bar"
                          style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1 + 0.3}s` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 px-4 md:px-8 lg:px-16 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in delay-200">
                {/* Updated text to Elvin Manuel */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Hello! I'm Elvin Manuel, a software engineer with a passion for crafting digital products that make an
                  impact. My journey in tech started with curiosity and evolved into a profession where I bridge the gap
                  between design and development.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I specialize in high-performance web applications, leveraging the latest stack to build scalable and
                  maintainable solutions. When I'm not coding, I'm exploring new design trends or contributing to
                  open-source projects.
                </p>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border animate-fade-in delay-300 group">
                <img
                  src="/software-engineer-headshot.png"
                  alt="Profile"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </section>



        <section id="contact" className="py-24 px-4 md:px-8 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold">Interested in collaborating?</h2>
            <p className="text-lg text-muted-foreground">
              I'm always looking for new opportunities and interesting projects to work on. Feel free to reach out if
              you want to build something amazing together.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-primary text-white hover:bg-primary/90 font-bold py-3 px-10 rounded-md transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </section>

        <Footer />

        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </main>
    </LayoutWrapper>
  )
}
