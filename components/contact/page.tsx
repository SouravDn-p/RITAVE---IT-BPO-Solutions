"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Enhanced WhatsApp Floating Button - moved to separate component */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition-all duration-200 animate-bounce"
          aria-label="Contact us on WhatsApp"
          onClick={() => {
            const message = encodeURIComponent("Hi! I'm interested in RITAVE's services. Could you help me?")
            window.open(`https://wa.me/15551234567?text=${message}`, "_blank")
          }}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      <ScrollToTop />
      <Footer />
    </main>
  )
}
