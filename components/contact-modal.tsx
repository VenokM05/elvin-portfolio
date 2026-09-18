"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Replace with your Formspree endpoint (https://formspree.io)
const FORMSPREE_ENDPOINT = "/YOUR_FORMSPREE_ID"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get In Touch</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Have a project in mind? Let&apos;s build something amazing together.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Elvin Manuel" required className="bg-secondary/50 border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="elvin@example.com"
              required
              className="bg-secondary/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
              className="bg-secondary/50 border-border min-h-[120px]"
            />
          </div>

          {submitStatus === "success" && (
            <p className="text-sm text-green-500 font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-sm text-destructive font-medium">Something went wrong. Please try again or email me directly.</p>
          )}

          <Button type="submit" className="w-full font-bold py-6 text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
