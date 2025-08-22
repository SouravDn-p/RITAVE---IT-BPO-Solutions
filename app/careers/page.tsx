"use client";

import type React from "react";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Globe,
  Users,
  TrendingUp,
  Heart,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Upload,
} from "lucide-react";
import { useState } from "react";

const benefits = [
  {
    icon: Globe,
    title: "Global Opportunities",
    description:
      "Work with clients from healthcare, technology, and e-commerce industries worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Continuous learning opportunities and clear career advancement paths.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Join a diverse, inclusive team of professionals from around the world.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Flexible working arrangements and comprehensive wellness programs.",
  },
];

const jobListings = [
  {
    title: "Medical Claims Processor",
    department: "BPO Services",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    description:
      "Process medical claims with high accuracy, ensure HIPAA compliance, and maintain quality standards for US healthcare clients.",
    requirements: [
      "Experience in medical claims processing",
      "Knowledge of HIPAA regulations",
      "Strong attention to detail",
      "Excellent English communication skills",
      "Ability to work in US time zones",
    ],
    responsibilities: [
      "Process medical claims accurately and efficiently",
      "Verify patient information and insurance details",
      "Handle claim denials and appeals",
      "Maintain HIPAA compliance at all times",
      "Meet daily productivity and quality targets",
    ],
  },
  {
    title: "Full Stack Web Developer",
    department: "IT Services",
    location: "Remote",
    type: "Full-time",
    experience: "2-5 years",
    description:
      "Develop modern web applications using React, Next.js, and other cutting-edge technologies for global clients.",
    requirements: [
      "Proficiency in React, Next.js, TypeScript",
      "Experience with Node.js and databases",
      "Knowledge of modern web development practices",
      "Strong problem-solving skills",
      "Portfolio of previous work",
    ],
    responsibilities: [
      "Build responsive web applications",
      "Collaborate with design and product teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Stay updated with latest technologies",
    ],
  },
  {
    title: "BPO Operations Specialist",
    department: "BPO Services",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Manage BPO operations, ensure quality standards, and support various business processes for international clients.",
    requirements: [
      "Experience in BPO operations",
      "Strong analytical and organizational skills",
      "Excellent communication abilities",
      "Knowledge of quality management systems",
      "Flexibility to work different time zones",
    ],
    responsibilities: [
      "Oversee daily BPO operations",
      "Monitor quality and productivity metrics",
      "Train and support team members",
      "Implement process improvements",
      "Maintain client relationships",
    ],
  },
  {
    title: "Customer Support Representative",
    department: "Support Services",
    location: "Remote",
    type: "Full-time",
    experience: "1-2 years",
    description:
      "Provide exceptional customer support to global clients through various channels including chat, email, and phone.",
    requirements: [
      "Excellent English communication skills",
      "Customer service experience",
      "Technical troubleshooting abilities",
      "Patience and empathy",
      "Availability for flexible schedules",
    ],
    responsibilities: [
      "Handle customer inquiries and issues",
      "Provide technical support and guidance",
      "Maintain customer satisfaction scores",
      "Document and escalate complex issues",
      "Contribute to knowledge base articles",
    ],
  },
];

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleApplicationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.currentTarget);
    const applicationData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      position: formData.get("position"),
      experience: formData.get("experience"),
      coverLetter: formData.get("coverLetter"),
      // In a real implementation, you'd handle file upload separately
      resumeFile: formData.get("resume")?.name || "resume.pdf",
    };

    try {
      const response = await fetch("/api/career-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage(
          "Application submitted successfully! We'll get back to you soon."
        );
        e.currentTarget.reset();
      } else {
        setSubmitMessage("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("sd Error submitting application:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyNow = (jobTitle: string) => {
    console.log(`sd Applying for position: ${jobTitle}`);
    // Scroll to application form
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground">
              Join Our <span className="text-primary">Global Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build your career with RITAVE and be part of a dynamic team
              delivering world-class IT and BPO solutions to clients worldwide.
            </p>
            <Button size="lg" className="text-lg px-8">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Why Join RITAVE
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Your Career <span className="text-primary">Awaits</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join a company that values growth, innovation, and work-life
              balance while serving global clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
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
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Open Positions
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Current <span className="text-primary">Opportunities</span>
            </h2>
          </div>

          <div className="grid gap-8">
            {jobListings.map((job, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-serif">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge
                          variant="outline"
                          className="border-accent text-accent"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      className="cursor-pointer hover:scale-105 transition-all bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      onClick={() => handleApplyNow(job.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                            <span className="text-sm text-muted-foreground">
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, respIndex) => (
                          <li
                            key={respIndex}
                            className="flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                            <span className="text-sm text-muted-foreground">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent">
              Apply Now
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Start Your <span className="text-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to join our team? Fill out the application form below and
              we'll get back to you soon.
            </p>
          </div>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="pt-8">
              <form className="space-y-6" onSubmit={handleApplicationSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="position"
                      className="text-sm font-medium text-foreground"
                    >
                      Position Applied For *
                    </label>
                    <Select required>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical-claims">
                          Medical Claims Processor
                        </SelectItem>
                        <SelectItem value="web-developer">
                          Full Stack Web Developer
                        </SelectItem>
                        <SelectItem value="bpo-specialist">
                          BPO Operations Specialist
                        </SelectItem>
                        <SelectItem value="customer-support">
                          Customer Support Representative
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="experience"
                      className="text-sm font-medium text-foreground"
                    >
                      Years of Experience
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="coverLetter"
                    className="text-sm font-medium text-foreground"
                  >
                    Cover Letter / Why do you want to join RITAVE?
                  </label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us about yourself and why you're interested in joining our team..."
                    rows={6}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="resume"
                    className="text-sm font-medium text-foreground"
                  >
                    Resume / CV *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop your resume
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-border text-accent focus:ring-accent"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the terms and conditions and privacy policy *
                  </label>
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes("success")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer hover:scale-105 transition-all bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
