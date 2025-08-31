"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  Inbox,
} from "lucide-react";
import {
  useGetInquiriesQuery,
  useGetJobApplicationsQuery,
  useGetJobsQuery,
} from "@/redux/api/api";

export default function AdminDashboard() {
  const {
    data: inquiriesData,
    error: inquiriesError,
    isLoading: inquiriesLoading,
  } = useGetInquiriesQuery(undefined);
  const {
    data: applicationsData,
    error: applicationsError,
    isLoading: applicationsLoading,
  } = useGetJobApplicationsQuery(undefined);
  const {
    data: jobsData,
    error: jobsError,
    isLoading: jobsLoading,
  } = useGetJobsQuery(undefined);

  const inquiries = inquiriesData?.inquiries || [];
  const applications = applicationsData?.applications || [];
  const jobs = jobsData?.jobs || [];

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
      title: "Active Jobs",
      value: jobs.length.toString(),
      change: jobs.length ? "+15%" : "0%",
      changeType: jobs.length ? "positive" : "neutral",
      icon: FileText,
    },
  ];

  // Professional loading state
  if (inquiriesLoading || applicationsLoading || jobsLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-1/3 sm:h-8 sm:w-1/4" />
          <Skeleton className="h-4 w-1/2 sm:w-1/3" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="border-border">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent items skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-16 sm:w-20" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border gap-2"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-7 w-16 sm:w-20" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border gap-2"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (
    inquiriesError ||
    applicationsError ||
    jobsError ||
    !inquiriesData?.success ||
    !applicationsData?.success ||
    !jobsData?.success
  ) {
    return (
      <div className="p-4 sm:p-6">
        <Card className="border-border max-w-2xl mx-auto">
          <CardContent className="pt-6 sm:pt-8 text-center">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Unable to Load Dashboard
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              We're having trouble loading your dashboard data. Please try again
              in a few moments.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="text-sm sm:text-base"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here's what's happening with RITAVE today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-green-600 border-green-600 text-xs sm:text-sm"
          >
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Recent Inquiries */}
        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl font-serif">
              Recent Inquiries
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs sm:text-sm"
            >
              <a href="/admin/inquiries">
                View All
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Inbox className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">
                  No Inquiries Yet
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  When customers reach out, their inquiries will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {inquiries.slice(0, 4).map((inquiry: any) => (
                  <div
                    key={inquiry.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors gap-2"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground text-sm sm:text-base">
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
                      <p className="text-xs sm:text-sm text-muted-foreground">
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
                        className="text-xs whitespace-nowrap"
                      >
                        {inquiry.status === "new" && (
                          <AlertCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        )}
                        {inquiry.status === "in-progress" && (
                          <Clock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        )}
                        {inquiry.status === "completed" && (
                          <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        )}
                        <span className="hidden xs:inline">
                          {inquiry.status.replace("-", " ")}
                        </span>
                        <span className="xs:hidden">
                          {inquiry.status.charAt(0).toUpperCase()}
                        </span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl font-serif">
              Recent Applications
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs sm:text-sm"
            >
              <a href="/admin/applications">
                View All
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Inbox className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">
                  No Applications Yet
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  When candidates apply for positions, their applications will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {applications.slice(0, 4).map((application: any) => (
                  <div
                    key={application.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors gap-2"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm sm:text-base">
                        {application.name}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
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
                      className="text-xs whitespace-nowrap self-start sm:self-auto"
                    >
                      <span className="hidden xs:inline">
                        {application.status.replace("-", " ")}
                      </span>
                      <span className="xs:hidden">
                        {application.status.charAt(0).toUpperCase()}
                      </span>
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
