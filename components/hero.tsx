import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center overflow-hidden" aria-label="Hero section">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 0.95) 0%, rgba(20, 20, 20, 0.4) 40%, rgba(20, 20, 20, 0) 100%), url('/modern-cinematic-tech-workspace-background.jpg')`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,9,20,0.1)_0%,transparent_50%)] animate-pulse" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight">
            Designing <span className="text-primary italic">Experiences</span>,
            <br /> Building Futures.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            I'm a Full Stack Developer specializing in building high-performance web applications with modern
            technologies. Passionate about clean code and exceptional user experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 font-bold px-8"
              aria-label="View projects"
            >
              <Play className="mr-2 h-5 w-5 fill-current" /> View Projects
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-muted/50 hover:bg-muted font-bold px-8 backdrop-blur-md"
              aria-label="Learn more about me"
            >
              <Info className="mr-2 h-5 w-5" /> More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" aria-hidden="true" />
    </section>
  )
}
