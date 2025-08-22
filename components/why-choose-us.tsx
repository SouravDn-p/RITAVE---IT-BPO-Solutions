import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, Clock, Shield } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Affordable",
    description: "Cost-effective solutions without compromising on quality. Save up to 60% on operational costs.",
  },
  {
    icon: Users,
    title: "Skilled Team",
    description: "Experienced professionals with expertise in healthcare, technology, and business processes.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock availability and support to ensure your business never stops running.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "HIPAA compliant and secure data handling with industry-standard security protocols.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
            Why Choose <span className="text-primary">RITAVE</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We combine expertise, reliability, and innovation to deliver exceptional results for your business.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
              >
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
