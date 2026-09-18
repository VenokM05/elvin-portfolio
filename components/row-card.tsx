"use client"

import { Play, Plus, X } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RowCardProps {
  title: string
  category: string
  image: string
  index: number
  description?: string
  tags?: string[]
  isTop10?: boolean // Added ranking props
  rank?: number
  isLearning?: boolean // Added learning state
  progress?: number
  link?: string
}

export function RowCard({
  title,
  category,
  image,
  index,
  description,
  tags = [],
  isTop10,
  rank,
  isLearning,
  progress = 0,
  link,
}: RowCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Default description if none provided
  const displayDescription =
    description ||
    `A detailed look into the ${title} project, focusing on ${category.toLowerCase()} implementation and user experience.`
  const displayTags = tags.length > 0 ? tags : [category, "React", "Next.js", "Tailwind"]

  const handleDemoClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative aspect-video rounded-md overflow-hidden bg-muted cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20 hover:shadow-2xl"
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: "forwards",
        }}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
          className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-40"
        />

        {isTop10 && (
          <div className="absolute top-2 right-2 z-10 scale-90 md:scale-100 animate-in fade-in duration-500">
            <div className="bg-primary text-white font-black px-2 py-0.5 rounded-sm text-[10px] md:text-xs flex flex-col items-center leading-none border border-white/20 shadow-lg">
              <span className="opacity-70 text-[8px]">TOP</span>
              <span>10</span>
            </div>
          </div>
        )}

        {isLearning && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 bg-gradient-to-t from-background via-background/40 to-transparent">
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/80 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:border-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-bold text-sm md:text-base leading-tight truncate">{title}</h3>
          <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-wider mt-1">{category}</p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-card sm:rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={title} onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
              <div className="flex gap-4">
                <Button className="bg-white text-black hover:bg-white/90 font-bold px-8" onClick={handleDemoClick}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> {link ? 'Visit Site' : 'Live Demo'}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-card/50 backdrop-blur-md border border-white/20"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-background/50 hover:bg-background/80 text-white z-20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-500 font-bold">98% Match</span>
                <span className="border border-muted px-1.5 py-0.5 rounded text-xs uppercase font-medium">HD</span>
                <span className="text-muted-foreground">2024</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{displayDescription}</p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Category: </span>
                <span className="text-foreground">{category}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Tech Stack: </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {displayTags.map((tag) => (
                    <span key={tag} className="bg-muted px-2 py-1 rounded text-xs text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
