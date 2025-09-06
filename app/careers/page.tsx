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
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  useSubmitJobApplicationMutation,
  useGetJobsQuery,
} from "@/redux/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Head from "next/head";

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
  const breadcrumbs = [{ name: "Careers", href: "/careers" }];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const { data: session } = useSession();
  const [submitJobApplication] = useSubmitJobApplicationMutation();
  const {
    data: jobsData,
    error: jobsError,
    isLoading: jobsLoading,
  } = useGetJobsQuery(undefined);

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
          reader.onload = () => resolve(reader.result as string);
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
        // Reset form using ref instead of e.currentTarget.reset()
        const form = e.target as HTMLFormElement;
        if (form) {
          form.reset();
        }
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
    return (
      <>
        <Head>
          <link rel="canonical" href="https://ritave.com/careers" />
          <title>Careers at RITAVE | Join Our Global Team</title>
          <meta
            name="description"
            content="Explore career opportunities at RITAVE. Join our global team delivering world-class IT and BPO solutions to clients worldwide. Competitive benefits and growth opportunities."
          />
          <meta
            name="keywords"
            content="careers, job opportunities, BPO jobs, IT jobs, remote work, global team, healthcare BPO, technology solutions"
          />
        </Head>
        <main className="min-h-screen">
          <Navigation />

          <section className="py-6 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* <Breadcrumbs items={breadcrumbs} /> */}
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-12 w-64 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item} className="border-border">
                    <CardContent className="pt-8 pb-6 space-y-4">
                      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-12 w-64 mx-auto" />
              </div>

              <div className="grid gap-8">
                {[1, 2].map((item) => (
                  <Card key={item} className="border-border">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="space-y-2">
                          <Skeleton className="h-8 w-64" />
                          <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Skeleton className="h-5 w-32 mb-3" />
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-4/6" />
                            </div>
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Skeleton className="h-5 w-32 mb-3" />
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-4/6" />
                            </div>
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-4/6" />
                            </div>
                            <div className="flex items-start gap-2">
                              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="application-form" className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-12 w-64 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>

              <Card className="border-border">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-24 w-full" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-32 w-full rounded-lg" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-64" />
                    </div>

                    <Skeleton className="h-12 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Footer />
        </main>
      </>
    );
  }

  if (jobsError || !jobsData?.success) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="p-6 text-center py-20">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-destructive">
            Failed to load jobs. Please try again later.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Head>
        <link rel="canonical" href="https://ritave.com/careers" />
        <title>Careers at RITAVE | Join Our Global Team</title>
        <meta
          name="description"
          content="Explore career opportunities at RITAVE. Join our global team delivering world-class IT and BPO solutions to clients worldwide. Competitive benefits and growth opportunities."
        />
        <meta
          name="keywords"
          content="careers, job opportunities, BPO jobs, IT jobs, remote work, global team, healthcare BPO, technology solutions"
        />
      </Head>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  No Positions Available
                </h3>
                <p className="text-muted-foreground mb-6">
                  We don't have any open positions at the moment. Please check
                  back later as we're always looking for talented individuals to
                  join our team.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Submit General Application
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {jobs.map((job: any) => (
                <Card
                  key={job.id}
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
                          {job.requirements.map(
                            (req: string, reqIndex: number) => (
                              <li
                                key={reqIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                                <span className="text-sm text-muted-foreground">
                                  {req}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map(
                            (resp: string, respIndex: number) => (
                              <li
                                key={respIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                                <span className="text-sm text-muted-foreground">
                                  {resp}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
                    <Input
                      id="position"
                      name="position"
                      placeholder="Enter the position you're applying for"
                      className="bg-background"
                      required
                    />
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
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("resume")?.click()}
                  >
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
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("File selected:", file.name);
                        }
                      }}
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
