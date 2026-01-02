"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Linkedin, Download, ExternalLink } from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Resume & Profile</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 py-4">
          <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-lg border border-border/50 space-y-4">
            <Linkedin className="w-16 h-16 text-[#0A66C2]" />
            <div className="text-center">
              <h3 className="text-xl font-bold">LinkedIn Profile</h3>
              <p className="text-muted-foreground">Connect with me on LinkedIn for my full professional history.</p>
            </div>
            <Button asChild className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-bold py-6">
              <a href="https://linkedin.com/in/elvin-manuel-181940147" target="_blank" rel="noopener noreferrer">
                View Profile <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold">Resume.pdf</p>
                <p className="text-xs text-muted-foreground">Updated Jan 2026</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="font-bold border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
