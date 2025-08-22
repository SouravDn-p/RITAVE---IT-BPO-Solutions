import { Card, CardContent } from "@/components/ui/card"
import { Heart, Laptop, ShoppingCart, GraduationCap } from "lucide-react"

const industries = [
  {
    icon: Heart,
    title: "Healthcare",
    description: "Medical claims processing, patient data management, and HIPAA-compliant solutions.",
    color: "text-red-500",
  },
  {
    icon: Laptop,
    title: "Technology",
    description: "Software development, IT support, and digital transformation services.",
    color: "text-blue-500",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Online store development, inventory management, and customer support solutions.",
    color: "text-green-500",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Educational technology solutions, data management, and administrative support.",
    color: "text-purple-500",
  },
]

export function IndustriesServed() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
            Industries We <span className="text-accent">Serve</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Specialized solutions tailored to meet the unique needs of different industries.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
              >
                <CardContent className="pt-8 pb-6 space-y-4 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <IconComponent className={`h-8 w-8 ${industry.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{industry.title}</h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
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
