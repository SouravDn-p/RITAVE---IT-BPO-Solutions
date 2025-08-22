import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Eye, Lightbulb, CheckCircle } from "lucide-react";
import Image from "next/image";

const coreValues = [
  {
    icon: Award,
    title: "Quality",
    description:
      "We maintain the highest standards in every project, ensuring exceptional results that exceed expectations.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "HIPAA-compliant processes and robust security measures protect your sensitive data at all times.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear communication and honest reporting keep you informed throughout every stage of our partnership.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology and creative solutions to drive your business forward.",
  },
];

const leadership = [
  {
    name: "Rajesh Kumar",
    role: "Chief Executive Officer",
    experience: "15+ years",
    background:
      "Former Senior Manager at Concentrix with expertise in healthcare BPO operations.",
    image: "/placeholder.svg?height=300&width=300&text=CEO",
  },
  {
    name: "Priya Sharma",
    role: "Chief Technology Officer",
    experience: "12+ years",
    background:
      "Ex-Cigna technology lead specializing in healthcare systems and data processing.",
    image: "/placeholder.svg?height=300&width=300&text=CTO",
  },
  {
    name: "Michael Johnson",
    role: "VP of Operations",
    experience: "10+ years",
    background:
      "Operations expert with deep experience in scaling BPO services for US healthcare clients.",
    image: "/placeholder.svg?height=300&width=300&text=VP",
  },
  {
    name: "Sarah Chen",
    role: "Head of Quality Assurance",
    experience: "8+ years",
    background:
      "Quality management specialist ensuring HIPAA compliance and process excellence.",
    image: "/placeholder.svg?height=300&width=300&text=QA",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground">
              About <span className="text-primary">RITAVE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in IT and BPO solutions, delivering
              excellence through innovation, expertise, and unwavering
              commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="text-accent border-accent">
                  Who We Are
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                  Transforming Business Through{" "}
                  <span className="text-primary">Technology</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Mission:</strong> To
                  empower businesses worldwide with innovative IT and BPO
                  solutions that drive growth, efficiency, and success in an
                  increasingly digital world.
                </p>
                <p className="text-lg">
                  <strong className="text-foreground">Vision:</strong> To be the
                  global leader in IT and BPO services, recognized for our
                  commitment to quality, innovation, and client success across
                  healthcare, technology, and e-commerce industries.
                </p>
                <p>
                  At RITAVE, we combine deep industry expertise with
                  cutting-edge technology to deliver solutions that not only
                  meet your current needs but anticipate future challenges. Our
                  team of skilled professionals is dedicated to helping your
                  business thrive in today's competitive landscape.
                </p>
              </div>
            </div>
            <div className="relative w-full ">
              <Image
                width={200}
                height={200}
                src="/Rative-image.png"
                alt="RITAVE professional team"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium shadow-lg">
                Serving 500+ Global Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Built on <span className="text-primary">Experience</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                RITAVE was founded by industry veterans with extensive
                experience at leading global companies. Our leadership team
                brings decades of combined experience in healthcare BPO,
                technology solutions, and business process optimization.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Healthcare Expertise
                    </h3>
                    <p className="text-muted-foreground">
                      Deep understanding of healthcare workflows, HIPAA
                      compliance, and medical claims processing from our Cigna
                      background.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      BPO Excellence
                    </h3>
                    <p className="text-muted-foreground">
                      Proven track record in scaling BPO operations and
                      delivering quality services from our Concentrix
                      experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Global Perspective
                    </h3>
                    <p className="text-muted-foreground">
                      Understanding of international business needs and cultural
                      nuances in serving global clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full ">
              <Image
                width={200}
                height={200}
                src="/mission.png"
                alt="RITAVE company growth"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Core Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              What Drives <span className="text-primary">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every service we
              deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
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
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team (Commented Out) */}
      {/* <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Leadership Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Meet Our <span className="text-primary">Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experienced professionals leading RITAVE with vision, expertise, and commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/50"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      width={200}
                      height={200}
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-serif font-bold text-foreground">{leader.name}</h3>
                    <p className="text-accent font-medium">{leader.role}</p>
                    <Badge variant="secondary" className="text-xs">
                      {leader.experience}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{leader.background}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
