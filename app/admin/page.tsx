"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import {
  useGetInquiriesQuery,
  useGetJobApplicationsQuery,
} from "@/redux/api/api";

export default function AdminDashboard() {
  const {
    data: inquiriesData,
    error: inquiriesError,
    isLoading: inquiriesLoading,
  } = useGetInquiriesQuery();
  const {
    data: applicationsData,
    error: applicationsError,
    isLoading: applicationsLoading,
  } = useGetJobApplicationsQuery();

  const inquiries = inquiriesData?.inquiries || [];
  const applications = applicationsData?.applications || [];

  const stats = [
    {
      title: "Total Inquiries",
      value: inquiries.length.toString(),
      change: inquiries.length ? "+10%" : "0%",
      changeType: inquiries.length ? "positive" : "neutral",
      icon: MessageSquare,
    },
    {
      title: "Job Applications",
      value: applications.length.toString(),
      change: applications.length ? "+5%" : "0%",
      changeType: applications.length ? "positive" : "neutral",
      icon: Users,
    },
    {
      title: "Website Visitors",
      value: "12,543",
      change: "+23%",
      changeType: "positive",
      icon: Eye,
    },
  ];

  if (inquiriesLoading || applicationsLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (
    inquiriesError ||
    applicationsError ||
    !inquiriesData?.success ||
    !applicationsData?.success
  ) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <p className="text-destructive">
          Failed to load dashboard data. Please try again later.
        </p>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          : stat.changeType === "neutral"
                          ? "text-muted-foreground"
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
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No inquiries available.
              </p>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(0, 4).map((inquiry: any) => (
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
                        {new Date(inquiry.date).toLocaleDateString()}
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
            )}
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
            {applications.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No applications available.
              </p>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 4).map((application: any) => (
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
                        {application.experience} experience •{" "}
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        application.status === "hired"
                          ? "default"
                          : application.status === "interviewed"
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
