import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesOverview } from "@/components/services-overview";
import { WhyChooseUs } from "@/components/why-choose-us";
import { IndustriesServed } from "@/components/industries-served";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { EnhancedWhatsAppButton } from "@/components/enhanced-whatsapp-button";
import Script from "next/script";
import Head from "next/head";

export const metadata: Metadata = {
  title:
    "RITAVE - IT & BPO Solutions | Your Partner in Global Business Solutions",
  description:
    "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
  keywords:
    "IT services, BPO solutions, medical claims processing, web development, data processing, remote staffing, healthcare BPO, HIPAA compliant",
};

export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://ritave.com" />
      </Head>
      <main className="min-h-screen">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RITAVE",
              url: "https://ritave.com",
              logo: "https://ritave.com/logo.png",
              description:
                "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 7488438971",
                contactType: "customer service",
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.linkedin.com/company/ritave",
                "https://twitter.com/ritave",
              ],
            }),
          }}
        />
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
    </>
  );
}
