import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Globe,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

const stats = [
  {
    title: "Total Inquiries",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    title: "Job Applications",
    value: "89",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Website Visitors",
    value: "12,543",
    change: "+23%",
    changeType: "positive" as const,
    icon: Eye,
  },
  {
    title: "Active Projects",
    value: "34",
    change: "+5%",
    changeType: "positive" as const,
    icon: FileText,
  },
];

const recentInquiries = [
  {
    id: "INQ-001",
    name: "Sarah Johnson",
    email: "sarah@medcare.com",
    service: "Medical Claims Processing",
    status: "new",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: "INQ-002",
    name: "Michael Chen",
    email: "m.chen@techflow.com",
    service: "Web Development",
    status: "in-progress",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "INQ-003",
    name: "Emily Rodriguez",
    email: "emily@datapro.com",
    service: "Remote Staffing",
    status: "completed",
    date: "2024-01-13",
    priority: "low",
  },
  {
    id: "INQ-004",
    name: "David Wilson",
    email: "david@healthsys.com",
    service: "Patient Demographics",
    status: "new",
    date: "2024-01-12",
    priority: "high",
  },
];

const recentApplications = [
  {
    id: "APP-001",
    name: "Priya Sharma",
    position: "Medical Claims Processor",
    experience: "3 years",
    status: "under-review",
    date: "2024-01-15",
  },
  {
    id: "APP-002",
    name: "Rajesh Kumar",
    position: "Full Stack Developer",
    experience: "5 years",
    status: "interview-scheduled",
    date: "2024-01-14",
  },
  {
    id: "APP-003",
    name: "Lisa Thompson",
    position: "BPO Specialist",
    experience: "2 years",
    status: "hired",
    date: "2024-01-13",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with RITAVE today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      } flex items-center gap-1`}
                    >
                      <TrendingUp className="h-3 w-3" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-serif">
              Recent Inquiries
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">
                        {inquiry.name}
                      </p>
                      <Badge
                        variant={
                          inquiry.priority === "high"
                            ? "destructive"
                            : inquiry.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {inquiry.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.service}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {inquiry.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        inquiry.status === "new"
                          ? "default"
                          : inquiry.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {inquiry.status === "new" && (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {inquiry.status === "in-progress" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {inquiry.status === "completed" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {inquiry.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-serif">
              Recent Applications
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {application.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.position}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {application.experience} experience • {application.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      application.status === "hired"
                        ? "default"
                        : application.status === "interview-scheduled"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {application.status.replace("-", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Image height={20} width={20} src="/icons/update-banner.svg" alt="Update Banner" />
              <span className="text-sm">Update Banner</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">View Inquiries</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Globe className="h-5 w-5" />
              <span className="text-sm">Site Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
