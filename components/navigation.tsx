"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, User, Settings, LogOut, Shield, Home } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleConsultation = () => {
    window.location.href = "/contact#consultation";
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              RITAVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-primary transition-colors relative group py-2"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            {/* <Link
              href="/careers"
              className="text-foreground hover:text-primary transition-colors relative group py-2"
            >
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link> */}
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors relative group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors relative group py-2"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            {status === "loading" ? (
              <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {session.user?.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/" className="cursor-pointer">
                      <Home className="image.png" />
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="hover:scale-105 transition-transform cursor-pointer"
                  onClick={handleConsultation}
                >
                  Get Free Consultation
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/services"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              {/* <Link
                href="/careers"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link> */}
              <Link
                href="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {session ? (
                <>
                  <div className="px-3 py-2 border-t border-border mt-2 pt-4">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="inline mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="inline mr-2 h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="inline mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  >
                    <LogOut className="inline mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="px-3 py-2">
                  <Button
                    size="sm"
                    className="w-full mb-2 cursor-pointer"
                    onClick={() => {
                      handleConsultation();
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
