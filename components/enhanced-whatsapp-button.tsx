"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"

export function EnhancedWhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in RITAVE's IT & BPO services. Could you please provide more information?",
    )
    const whatsappUrl = `https://wa.me/15551234567?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground text-sm">Need Help?</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsExpanded(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Chat with us on WhatsApp for quick support and consultation.
          </p>
          <Button size="sm" onClick={handleWhatsAppClick} className="w-full">
            Start Chat
          </Button>
        </div>
      )}
      <Button
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition-all duration-200 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  )
}
