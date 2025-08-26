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
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  useSubmitJobApplicationMutation,
  useGetJobsQuery,
} from "@/redux/api/api";

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

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const { data: session } = useSession();
  const [submitJobApplication] = useSubmitJobApplicationMutation();
  const {
    data: jobsData,
    error: jobsError,
    isLoading: jobsLoading,
  } = useGetJobsQuery();

  const jobs = jobsData?.jobs || [];

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
      resumeBase64: "",
    };

    const resumeFile = formData.get("resume");

    if (resumeFile instanceof File && resumeFile.size > 0) {
      try {
        applicationData.resumeBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(resumeFile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      } catch (error) {
        console.error("Error reading resume file:", error);
        setSubmitMessage("Failed to read resume file. Please try again.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const result = await submitJobApplication(applicationData).unwrap();

      if (result.success) {
        setSubmitMessage(
          "Application submitted successfully! We'll get back to you soon."
        );
        e.currentTarget.reset();
      } else {
        setSubmitMessage("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyNow = (jobTitle: string) => {
    console.log(`Applying for position: ${jobTitle}`);
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth" });
    // To preselect, but since select is not controlled, perhaps add state later
  };

  if (jobsLoading) {
    return <div>Loading jobs...</div>;
  }

  if (jobsError || !jobsData?.success) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <p className="text-destructive">
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }

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

          <div className="grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            {jobs.map((job, index) => (
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
                      name="firstName"
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
                      name="lastName"
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
                      name="email"
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
                      name="phone"
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
                    <Select name="position" required>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.title}>
                            {job.title}
                          </SelectItem>
                        ))}
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
                    <Select name="experience">
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
                    name="coverLetter"
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
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
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
