"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
  Zap,
  Database,
  Globe,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleScheduleConsultation = () => {
    console.log("sd Scheduling consultation");
    // Scroll to contact form or open modal
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewCaseStudies = () => {
    console.log("sd Viewing case studies");
    // Navigate to case studies page or section
    window.location.href = "/services";
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 py-20 lg:py-32 overflow-hidden min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium animate-in fade-in duration-1000">
              <Shield className="h-4 w-4 text-cyan-400" />
              Enterprise-Grade Security • HIPAA Compliant
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Your Partner in{" "}
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text animate-in fade-in duration-1000 delay-300">
                  IT, BPO
                </span>
                <br />
                <span className="text-white">&</span>{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text animate-in fade-in duration-1000 delay-500">
                  AI-Driven
                </span>
                <br />
                <span className="text-white">Solutions</span>
              </h1>

              <p className="text-lg text-white/80 max-w-xl animate-in slide-in-from-left-4 duration-1000 delay-200">
                Trusted by Fortune 500 companies for AI-driven BPO, healthcare
                solutions, and cutting-edge technology services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left-4 duration-1000 delay-400">
              <Link href={"/contact"}>
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 hover:scale-110 transition-all group cursor-pointer shadow-lg hover:shadow-xl"
                  onClick={handleScheduleConsultation}
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all cursor-pointer shadow-lg hover:shadow-xl"
                onClick={handleViewCaseStudies}
              >
                View Case Studies
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-8 animate-in slide-in-from-left-4 duration-1000 delay-600">
              <div className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-green-500/20">
                  <Shield className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  HIPAA Compliant
                </span>
              </div>
              {/* <div className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-yellow-500/20">
                  <Award className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  SOC 2 Certified
                </span>
              </div> */}
              <div className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-blue-500/20">
                  <Clock className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  24/7 Global Support
                </span>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-300">
            {/* Central AI Circle */}
            <div className="relative flex items-center justify-center">
              <div
                className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-pulse"
                aria-label="AI-powered solutions visualization"
              >
                <div className="w-60 h-60 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">AI</span>
                </div>
              </div>

              {/* Floating Statistics Cards */}
              <div
                className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-float"
                aria-label="99.9% accuracy rate statistic"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-white/80">Accuracy Rate</div>
                </div>
              </div>

              <div
                className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-float delay-1000"
                aria-label="24/7 global support availability"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/80">Global Support</div>
                </div>
              </div>

              {/* Floating Icon Elements */}
              <div
                className="absolute -top-12 left-8 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center animate-float delay-500 hover:scale-110 transition-transform"
                aria-label="Database management icon"
              >
                <Database className="h-6 w-6 text-white" />
              </div>

              <div
                className="absolute top-8 -right-16 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center animate-float delay-700 hover:scale-110 transition-transform"
                aria-label="Global connectivity icon"
              >
                <Globe className="h-6 w-6 text-white" />
              </div>

              <div
                className="absolute -bottom-16 right-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center animate-float delay-300 hover:scale-110 transition-transform"
                aria-label="Lightning fast processing icon"
              >
                <Zap className="h-6 w-6 text-white" />
              </div>

              <div
                className="absolute bottom-8 -left-16 w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center animate-float delay-900 hover:scale-110 transition-transform"
                aria-label="CPU processing power icon"
              >
                <Cpu className="h-6 w-6 text-white" />
              </div>

              <div
                className="absolute top-20 left-20 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center animate-float delay-1200 hover:scale-110 transition-transform"
                aria-label="Team collaboration icon"
              >
                <Users className="h-5 w-5 text-white" />
              </div>

              <div
                className="absolute -top-4 right-20 w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center animate-float delay-400 hover:scale-110 transition-transform"
                aria-label="Award winning quality icon"
              >
                <Award className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
