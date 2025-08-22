import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  Globe,
  Headphones,
  Shield,
  Users,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email for detailed inquiries",
    contact: "contact@ritave.com",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+1 (555) 123-4567",
    action: "Call Now",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Quick support via WhatsApp",
    contact: "+880 1328764976",
    action: "Chat Now",
  },
];

const officeInfo = [
  {
    icon: Globe,
    title: "Global Presence",
    description: "Serving clients worldwide from our headquarters in India",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock availability across all time zones",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Assigned account managers for personalized service",
  },
  {
    icon: Shield,
    title: "Secure Communication",
    description: "HIPAA-compliant and secure communication channels",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg"
          aria-label="Contact us on WhatsApp"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your business? Contact our team of experts for
              a free consultation and discover how RITAVE can help you achieve
              your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Contact Methods
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Multiple Ways to <span className="text-primary">Connect</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
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
                        {method.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {method.description}
                      </p>
                      <p className="font-medium text-foreground mb-4">
                        {method.contact}
                      </p>
                      <Button variant="outline" size="sm">
                        {method.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="space-y-4 mb-8">
                <Badge variant="outline" className="text-accent border-accent">
                  Send Message
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                  Let's Start a{" "}
                  <span className="text-primary">Conversation</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium text-foreground"
                        >
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium text-foreground"
                        >
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-sm font-medium text-foreground"
                        >
                          Company Name
                        </label>
                        <Input
                          id="company"
                          placeholder="Enter your company name"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="industry"
                          className="text-sm font-medium text-foreground"
                        >
                          Industry
                        </label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-commerce
                            </SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="service"
                        className="text-sm font-medium text-foreground"
                      >
                        Service Interest
                      </label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select service you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical-claims">
                            Medical Claims Processing
                          </SelectItem>
                          <SelectItem value="patient-demographics">
                            Patient Demographic Entry
                          </SelectItem>
                          <SelectItem value="web-development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="mobile-apps">
                            Mobile App Development
                          </SelectItem>
                          <SelectItem value="data-processing">
                            Data Processing
                          </SelectItem>
                          <SelectItem value="remote-staffing">
                            Remote Staffing
                          </SelectItem>
                          <SelectItem value="consultation">
                            General Consultation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                        rows={5}
                        className="bg-background"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm text-muted-foreground"
                      >
                        Subscribe to our newsletter for updates and insights
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <Badge
                  variant="outline"
                  className="text-accent border-accent mb-4"
                >
                  Contact Information
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
                  We're Here to <span className="text-primary">Help</span>
                </h2>
              </div>

              {/* Office Info Cards */}
              <div className="space-y-4">
                {officeInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="border-border">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {info.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Direct Contact Info */}
              <Card className="border-border bg-primary/5">
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-muted-foreground">
                          contact@ritave.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-muted-foreground">+880 1328764976</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">
                          Headquarters
                        </p>
                        <p className="text-muted-foreground">
                          India - Serving Global Clients
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">
                          Business Hours
                        </p>
                        <p className="text-muted-foreground">
                          24/7 Support Available
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border-accent/50 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Users className="h-8 w-8 text-accent mx-auto" />
                    <h3 className="font-semibold text-foreground">
                      Quick Response Guarantee
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We respond to all inquiries within 24 hours during
                      business days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
