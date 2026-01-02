import { Github, Linkedin, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background py-12 px-4 md:px-8 lg:px-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white">E</div>
            <span className="font-bold tracking-tight">Elvin Manuel</span>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/VenokM05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/elvin-manuel-181940147/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/VenokM" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="mailto:elvinlazmanuel@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">© 2026 Elvin Manuel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
