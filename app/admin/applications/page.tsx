"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Mail,
  Phone,
  Download,
  FileText,
  User,
  AlertTriangle,
} from "lucide-react";
import { useGetJobApplicationsQuery, useDeleteJobApplicationMutation } from "@/redux/api/api";
// import {
//   useGetJobApplicationsQuery,
//   useDeleteJobApplicationMutation,
// } from "@/redux/api/api";

export default function ApplicationsManagement() {
  const { data, error, isLoading } = useGetJobApplicationsQuery();
  const [deleteApplication] = useDeleteJobApplicationMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const handleViewApplication = (applicationId: string) => {
    console.log(`Viewing application: ${applicationId}`);
    // Implementation for viewing application details
  };

  const handleContactApplicant = (email: string, phone: string) => {
    console.log(`Contacting applicant: ${email}, ${phone}`);
    // Implementation for contacting applicant
  };

  const handleDownloadResume = (resumeUrl: string) => {
    console.log(`Downloading resume: ${resumeUrl}`);
    // Implementation for downloading resume
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteApplication(id).unwrap();
      console.log(`Application ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const filteredApplications =
    data?.applications?.filter(
      (app) =>
        (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? app.status === statusFilter : true) &&
        (positionFilter
          ? app.position.toLowerCase().includes(positionFilter.toLowerCase())
          : true)
    ) || [];

  const stats = {
    new: filteredApplications.filter((app) => app.status === "new").length,
    reviewed: filteredApplications.filter((app) => app.status === "reviewed")
      .length,
    interviewed: filteredApplications.filter(
      (app) => app.status === "interviewed"
    ).length,
    responseRate: filteredApplications.length
      ? Math.round(
          ((filteredApplications.length -
            filteredApplications.filter((app) => app.status === "new").length) /
            filteredApplications.length) *
            100
        )
      : 0,
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <p className="text-destructive">
          Failed to load applications. Please try again later.
        </p>
      </div>
    );
  }

  if (
    !filteredApplications.length &&
    !searchTerm &&
    !statusFilter &&
    !positionFilter
  ) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No applications available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Career Applications
          </h1>
          <p className="text-muted-foreground">
            Manage job applications and candidate pipeline
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button
            variant="outline"
            className="cursor-pointer hover:scale-105 transition-transform bg-transparent"
            onClick={() => console.log("Exporting applications")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Applications
          </Button> */}
          <Button
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            onClick={() => console.log("Sending bulk emails")}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Bulk Email
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.new}</p>
              <p className="text-sm text-muted-foreground">New Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-yellow-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.reviewed}
              </p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.interviewed}
              </p>
              <p className="text-sm text-muted-foreground">Interviewed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.responseRate}%
              </p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications by name, email, or position..."
                  className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-accent/50 transition-colors bg-transparent"
                onClick={() => console.log("Opening filter options")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
              >
                <option value="">All Positions</option>
                <option value="medical-claims">Medical Claims Processor</option>
                <option value="web-developer">Full Stack Web Developer</option>
                <option value="bpo-specialist">
                  BPO Operations Specialist
                </option>
                <option value="customer-support">
                  Customer Support Representative
                </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-serif">All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 &&
          (searchTerm || statusFilter || positionFilter) ? (
            <p className="text-muted-foreground text-center">
              No results found for your search or filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {application.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {application.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {application.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-primary/50 text-primary"
                        >
                          {application.position}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.experience}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "new"
                              ? "default"
                              : application.status === "reviewed"
                              ? "secondary"
                              : application.status === "interviewed"
                              ? "outline"
                              : "default"
                          }
                          className={
                            application.status === "new"
                              ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                              : application.status === "reviewed"
                              ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                              : "bg-green-500/10 text-green-600 border-green-500/20"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer hover:bg-accent/50"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleViewApplication(application.id)
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleDownloadResume(application.resume)
                              }
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleContactApplicant(
                                  application.email,
                                  application.phone
                                )
                              }
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleContactApplicant(
                                  application.email,
                                  application.phone
                                )
                              }
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Applicant
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer"
                              onClick={() =>
                                handleDeleteApplication(application.id)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
