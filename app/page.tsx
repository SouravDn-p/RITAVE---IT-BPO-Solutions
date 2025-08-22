import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesOverview } from "@/components/services-overview"
import { WhyChooseUs } from "@/components/why-choose-us"
import { IndustriesServed } from "@/components/industries-served"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { EnhancedWhatsAppButton } from "@/components/enhanced-whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <IndustriesServed />
      <Testimonials />
      <CTASection />
      <Footer />
      <ScrollToTop />
      <EnhancedWhatsAppButton />
    </main>
  )
}
