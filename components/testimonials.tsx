import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Healthcare Administrator",
    company: "MedCare Solutions",
    content:
      "RITAVE has transformed our claims processing workflow. Their HIPAA-compliant solutions and attention to detail are exceptional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "TechFlow Inc.",
    content:
      "Outstanding web development services. The team delivered our e-commerce platform on time and exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "DataPro Services",
    content:
      "Their remote staffing solutions have been a game-changer for our business. Professional, reliable, and cost-effective.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
            Trusted by <span className="text-primary">Global Teams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See what our clients say about working with RITAVE and the results we deliver.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
            >
              <CardContent className="pt-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-accent/60" />

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-lg font-medium text-foreground">
            Trusted by <span className="text-accent font-bold">500+</span> global teams & professionals
          </p>
        </div>
      </div>
    </section>
  )
}
