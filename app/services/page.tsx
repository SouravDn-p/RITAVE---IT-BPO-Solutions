import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UserCheck,
  Database,
  Code,
  Smartphone,
  ShoppingCart,
  Users,
  Brain,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
  BookOpen,
  Globe,
} from "lucide-react";
import Link from "next/link";

const bpoServices = [
  {
    icon: FileText,
    title: "Medical Claims Processing",
    description:
      "Comprehensive medical claims processing with 99.5% accuracy rate and HIPAA compliance.",
    features: [
      "HIPAA Compliant Processing",
      "99.5% Accuracy Rate",
      "Fast Turnaround Times",
      "Quality Assurance",
      "Denial Management",
      "Prior Authorization",
    ],
    benefits: [
      "Reduced Processing Time",
      "Lower Error Rates",
      "Cost Savings",
      "Compliance Assurance",
    ],
  },
  {
    icon: UserCheck,
    title: "Patient Demographic Entry",
    description:
      "Accurate patient data entry and demographic information management for healthcare providers.",
    features: [
      "Patient Registration",
      "Insurance Verification",
      "Demographic Updates",
      "Data Validation",
      "HIPAA Secure Processing",
      "Quality Control",
    ],
    benefits: [
      "Improved Data Accuracy",
      "Faster Patient Processing",
      "Reduced Administrative Burden",
      "Enhanced Patient Experience",
    ],
  },
  {
    icon: Database,
    title: "Data Entry & Processing",
    description:
      "High-volume data entry and processing services with stringent quality control measures.",
    features: [
      "High-Volume Processing",
      "Multi-format Support",
      "Quality Assurance",
      "Data Validation",
      "Secure Handling",
      "Custom Workflows",
    ],
    benefits: [
      "Increased Efficiency",
      "Cost Reduction",
      "Scalable Solutions",
      "Error-Free Processing",
    ],
  },
];

const itServices = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web applications and websites using modern technologies like React, Next.js, and WordPress.",
    features: [
      "React & Next.js Development",
      "WordPress Solutions",
      "Custom Web Applications",
      "Responsive Design",
      "SEO Optimization",
      "Performance Optimization",
    ],
    benefits: [
      "Modern Technology Stack",
      "Scalable Architecture",
      "SEO-Friendly",
      "Mobile Responsive",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android platforms.",
    features: [
      "iOS & Android Apps",
      "Cross-Platform Solutions",
      "UI/UX Design",
      "App Store Deployment",
      "Maintenance & Support",
      "Performance Monitoring",
    ],
    benefits: [
      "Native Performance",
      "Cross-Platform Compatibility",
      "User-Friendly Design",
      "App Store Ready",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Complete e-commerce platforms with payment integration, inventory management, and analytics.",
    features: [
      "Custom E-commerce Platforms",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing",
      "Analytics & Reporting",
      "Mobile Commerce",
    ],
    benefits: [
      "Increased Sales",
      "Better Customer Experience",
      "Automated Processes",
      "Data-Driven Insights",
    ],
  },
];

const additionalServices = [
  {
    icon: Users,
    title: "Remote Staffing",
    description:
      "Skilled remote professionals for your business needs with 24/7 availability and support.",
    features: [
      "Skilled Professionals",
      "24/7 Availability",
      "Flexible Scaling",
      "Quality Assurance",
      "Project Management",
      "Communication Tools",
    ],
  },
  {
    icon: Brain,
    title: "AI-Driven Solutions",
    description:
      "Intelligent automation and AI-powered solutions to streamline your business processes.",
    features: [
      "Process Automation",
      "AI Integration",
      "Machine Learning",
      "Workflow Optimization",
      "Predictive Analytics",
      "Custom AI Solutions",
    ],
  },
  {
    icon: BookOpen,
    title: "Basic Bookkeeping Made Easy",
    description: "Keep your finances organized without the hassle.",
    features: [
      "Affordable bookkeeping for freelancers & SMBs",
      "Expert handling using QuickBooks or Xero",
      "Accurate records to help your business grow",
      "Get Started Today!",
    ],
  },
  {
    icon: Globe,
    title: "Virtual Assistance",
    description:
      "Professional virtual assistants to handle your daily business tasks efficiently.",
    features: [
      "Inbox & Calendar Management",
      "Customer Support & Follow-ups",
      "Data Entry & Research",
      "Social Media Assistance",
      "Time & Task Management",
      "Focus on Growth, We Handle the Rest",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT and BPO solutions designed to help your business
              grow and succeed in today's competitive market.
            </p>
          </div>
        </div>
      </section>

      {/* BPO Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              BPO Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Business Process <span className="text-primary">Outsourcing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Streamline your operations with our specialized BPO services,
              designed for healthcare and business efficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {bpoServices.map((service, index) => {
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
                      <p className="text-muted-foreground mt-2">
                        {service.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Benefits:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <Badge
                            key={benefitIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              IT Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Information <span className="text-primary">Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Modern technology solutions to digitize and optimize your business
              operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {itServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
                >
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">
                        {service.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Technologies & Features:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Benefits:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <Badge
                            key={benefitIndex}
                            variant="outline"
                            className="text-xs border-primary text-primary"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Additional Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Specialized <span className="text-primary">Solutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {additionalServices.map((service, index) => {
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
                      <p className="text-muted-foreground mt-2">
                        {service.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-accent" />
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
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Our <span className="text-primary">Guarantees</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-muted-foreground">
                    Round-the-clock availability and support for all your
                    business needs.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                    HIPAA Compliant
                  </h3>
                  <p className="text-muted-foreground">
                    Full compliance with healthcare data security and privacy
                    regulations.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                    Quality Assured
                  </h3>
                  <p className="text-muted-foreground">
                    Rigorous quality control processes ensuring 99.5%+ accuracy
                    rates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href={"/contact"}>
              <Button size="lg" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
