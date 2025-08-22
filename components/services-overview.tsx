import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Code, Database, UserCheck, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: FileText,
    title: "Medical Claims Processing",
    description: "HIPAA-compliant medical claims processing with 99.5% accuracy rate and fast turnaround times.",
    features: ["HIPAA Compliant", "99.5% Accuracy", "Fast Processing"],
  },
  {
    icon: UserCheck,
    title: "Patient Demographic Entry",
    description: "Accurate patient data entry and demographic information management for healthcare providers.",
    features: ["Data Accuracy", "HIPAA Secure", "Quality Assured"],
  },
  {
    icon: Code,
    title: "Web & App Development",
    description: "Custom web applications, mobile apps, and e-commerce solutions using modern technologies.",
    features: ["React/Next.js", "Mobile Apps", "E-commerce"],
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Comprehensive data entry, processing, and management services with high accuracy standards.",
    features: ["High Accuracy", "Secure Processing", "Quality Control"],
  },
  {
    icon: Users,
    title: "Remote Staffing",
    description: "Skilled remote professionals for your business needs with 24/7 availability and support.",
    features: ["24/7 Available", "Skilled Team", "Cost Effective"],
  },
  {
    icon: Brain,
    title: "AI-Driven Solutions",
    description: "Intelligent automation and AI-powered solutions to streamline your business processes.",
    features: ["Process Automation", "AI Integration", "Efficiency Boost"],
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive IT and BPO solutions designed to help your business
            grow and succeed in today's competitive market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
              >
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-serif">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={"/services"}>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
