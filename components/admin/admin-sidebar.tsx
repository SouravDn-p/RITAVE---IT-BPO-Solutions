"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  ImageIcon,
  MessageSquare,
  Users,
  Settings,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  // {
  //   name: "Image Management",
  //   href: "/admin/images",
  //   icon: ImageIcon,
  // },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
    badge: "12",
  },
  {
    name: "Career Applications",
    href: "/admin/applications",
    icon: Users,
    badge: "24",
  },
  {
    name: "Create Job",
    href: "/admin/create-job",
    icon: FileText,
    badge: "4",
  },
  // {
  //   name: "Content Management",
  //   href: "/admin/content",
  //   icon: FileText,
  // },
  // {
  //   name: "Analytics",
  //   href: "/admin/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   name: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
];

export function AdminSidebar() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const userEmail = session?.user?.email;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = () => {
    console.log("sd Admin signing out");
    // Implementation for sign out
    // In a real app, this would clear session/tokens and redirect to login
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background cursor-pointer hover:scale-105 transition-transform" // Added cursor pointer and hover effect
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-border">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              {" "}
              {/* Added gradient and hover effect */}
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-foreground">
                RITAVE
              </span>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-[1.02]", // Added cursor pointer and hover scale effect
                    isActive
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md" // Added gradient for active state
                      : "text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-sm"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "outline"}
                      className={cn(
                        "text-xs transition-all",
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : "hover:bg-primary/10 hover:border-primary/30" // Added hover effects for badges
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                {" "}
                {/* Added gradient and hover effect */}
                <span className="text-accent-foreground font-medium text-sm">
                  A
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground">
                  {userEmail ? userEmail : "admin@ritave.com"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent cursor-pointer hover:scale-105 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all" // Added cursor pointer and enhanced hover effects
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden cursor-pointer" // Added cursor pointer
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
