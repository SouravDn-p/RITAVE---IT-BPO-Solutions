import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, X, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">
                  R
                </span>
              </div>
              <span className="font-serif font-bold text-xl">RITAVE</span>
            </div>
            <p className="text-primary-foreground/80">
              Your trusted partner in IT and BPO solutions, serving global
              clients with excellence and innovation.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Medical Claims Processing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Patient Demographic Entry
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Data Processing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Remote Staffing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">
                  contact@ritave.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">
                  +880 13287649767
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">
                  Serving Global Clients
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 RITAVE. All rights reserved. | Serving global clients with
            excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
