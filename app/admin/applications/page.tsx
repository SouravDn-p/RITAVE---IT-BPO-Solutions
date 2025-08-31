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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  CheckCircle,
  XCircle,
  Clock,
  Inbox,
  ChevronDown,
} from "lucide-react";
import {
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useUpdateJobApplicationStatusMutation,
} from "@/redux/api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ApplicationsManagement() {
  const { data, error, isLoading } = useGetJobApplicationsQuery(undefined);
  const [deleteApplication] = useDeleteJobApplicationMutation();
  const [updateApplicationStatus] = useUpdateJobApplicationStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleContactApplicant = (email: string, phone: string) => {
    // Open email client
    window.location.href = `mailto:${email}`;
    toast.info(`Opening email client for ${email}`);
  };

  const handleDownloadResume = (resumeUrl: string) => {
    if (resumeUrl) {
      // In a real app, this would download the resume
      console.log(`Downloading resume: ${resumeUrl}`);
      // Create a temporary link to download
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Resume download started");
    } else {
      toast.warning("No resume available for this application");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteApplication(id).unwrap();
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error("Failed to delete application");
      console.error("Failed to delete application:", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setUpdatingStatus(true);
    try {
      const result = await updateApplicationStatus({ id, status }).unwrap();
      if (result.success) {
        toast.success(`Application status updated to ${status}`);
        // Update the selected application if it's the one being viewed in the modal
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication({
            ...selectedApplication,
            status: status,
          });
        }
      } else {
        toast.error(
          `Failed to update status: ${result.message || "Unknown error"}`
        );
        console.error("Update failed:", result);
      }
    } catch (error: any) {
      console.error("Failed to update application status:", error);
      toast.error(
        `Failed to update status: ${
          error?.data?.message || error?.message || "Unknown error"
        }`
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredApplications =
    data?.applications?.filter(
      (app: any) =>
        (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? app.status === statusFilter : true) &&
        (positionFilter
          ? app.position.toLowerCase().includes(positionFilter.toLowerCase())
          : true)
    ) || [];

  const stats = {
    new: filteredApplications.filter((app: any) => app.status === "new").length,
    reviewed: filteredApplications.filter(
      (app: any) => app.status === "reviewed"
    ).length,
    interviewed: filteredApplications.filter(
      (app: any) => app.status === "interviewed"
    ).length,
    responseRate: filteredApplications.length
      ? Math.round(
          ((filteredApplications.length -
            filteredApplications.filter((app: any) => app.status === "new")
              .length) /
            filteredApplications.length) *
            100
        )
      : 0,
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-1/3 sm:h-8 sm:w-1/4" />
          <Skeleton className="h-4 w-1/2 sm:w-1/3" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="border-border">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-6 sm:h-6 sm:w-8 mx-auto mb-1" />
                  <Skeleton className="h-3 w-14 sm:h-4 sm:w-16 mx-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters skeleton */}
        <Card className="border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Skeleton className="h-9 sm:h-10 w-full" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-20 sm:w-24" />
                <Skeleton className="h-9 w-24 sm:w-32" />
                <Skeleton className="h-9 w-28 sm:w-36" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table skeleton */}
        <Card className="border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-24 sm:h-6 sm:w-32" />
                <Skeleton className="h-8 w-20 sm:w-24" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border gap-2"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 sm:w-32" />
                        <Skeleton className="h-3 w-20 sm:w-24" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-14 sm:w-16" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive mx-auto mb-3 sm:mb-4" />
        <p className="text-destructive text-sm sm:text-base">
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
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Career Applications
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage job applications and candidate pipeline
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-border">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">
                  0
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  New Applications
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">
                  0
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Reviewed
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">
                  0
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Interviewed
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">
                  0%
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Response Rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty state */}
        <Card className="border-border">
          <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center">
            <Inbox className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">
              No Applications Yet
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              When candidates apply for positions, their applications will
              appear here.
            </p>
            <Button
              className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs sm:text-sm"
              onClick={() => toast.info("Bulk email feature coming soon")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Bulk Email
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
            Career Applications
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage job applications and candidate pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs sm:text-sm"
            onClick={() => toast.info("Bulk email feature coming soon")}
          >
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Send Bulk Email</span>
            <span className="xs:hidden">Bulk Email</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-foreground">
                {stats.new}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                New Applications
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-yellow-500/50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-foreground">
                {stats.reviewed}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Under Review
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-foreground">
                {stats.interviewed}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Interviewed
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-foreground">
                {stats.responseRate}%
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Response Rate
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-accent/50 transition-colors bg-transparent text-xs sm:text-sm h-9"
                onClick={() => toast.info("Filter options coming soon")}
              >
                <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Filter</span>
              </Button>
              <select
                className="px-2 py-1.5 sm:px-3 sm:py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors text-xs sm:text-sm"
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
                className="px-2 py-1.5 sm:px-3 sm:py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors text-xs sm:text-sm"
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
          <CardTitle className="text-lg sm:text-xl font-serif">
            All Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 &&
          (searchTerm || statusFilter || positionFilter) ? (
            <p className="text-muted-foreground text-center text-sm sm:text-base">
              No results found for your search or filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden lg:table-cell text-xs">
                      ID
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Applicant
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                      Position
                    </TableHead>
                    <TableHead className="hidden lg:table-cell text-xs sm:text-sm">
                      Experience
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                      Applied Date
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application: any) => (
                    <TableRow
                      key={application.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="hidden lg:table-cell font-medium text-xs">
                        {application.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">
                            {application.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {application.email}
                          </p>
                          <p className="text-xs text-muted-foreground md:hidden">
                            {application.position}
                          </p>
                          <p className="text-xs text-muted-foreground md:hidden">
                            Applied:{" "}
                            {new Date(
                              application.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className="border-primary/50 text-primary text-xs"
                        >
                          {application.position}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs">
                        {application.experience}
                      </TableCell>
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
                              ? "bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs"
                              : application.status === "reviewed"
                              ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs"
                              : "bg-green-500/10 text-green-600 border-green-500/20 text-xs"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer hover:bg-accent/50 h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              className="cursor-pointer text-sm"
                              onClick={() => handleViewApplication(application)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-sm"
                              onClick={() =>
                                handleDownloadResume(application.resume)
                              }
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-sm"
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
                              className="cursor-pointer text-sm"
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
                              className="text-destructive cursor-pointer text-sm"
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

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-11/12 rounded-lg sm:w-full sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">
              Application Details
            </DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-foreground text-sm">Name</h3>
                  <p className="text-muted-foreground text-base">
                    {selectedApplication.name}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">Email</h3>
                  <p className="text-muted-foreground text-base">
                    {selectedApplication.email}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">Phone</h3>
                  <p className="text-muted-foreground text-base">
                    {selectedApplication.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    Position
                  </h3>
                  <p className="text-muted-foreground text-base">
                    {selectedApplication.position}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    Experience
                  </h3>
                  <p className="text-muted-foreground text-base">
                    {selectedApplication.experience || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-foreground text-sm">
                    Status
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <Select
                      defaultValue={selectedApplication.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(selectedApplication.id, value)
                      }
                      disabled={updatingStatus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground flex items-center">
                      {updatingStatus ? (
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <>
                          Current:
                          <Badge
                            variant={
                              selectedApplication.status === "new"
                                ? "default"
                                : selectedApplication.status === "reviewed"
                                ? "secondary"
                                : selectedApplication.status === "interviewed"
                                ? "outline"
                                : "default"
                            }
                            className={
                              selectedApplication.status === "new"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20 ml-2"
                                : selectedApplication.status === "reviewed"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 ml-2"
                                : "bg-green-500/10 text-green-600 border-green-500/20 ml-2"
                            }
                          >
                            {selectedApplication.status}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground text-sm">
                  Cover Letter
                </h3>
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                    {selectedApplication.coverLetter ||
                      "No cover letter provided."}
                  </p>
                </div>
              </div>

              {selectedApplication.resume && (
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    Resume
                  </h3>
                  <Button
                    variant="outline"
                    className="mt-2 w-full sm:w-auto"
                    onClick={() =>
                      handleDownloadResume(selectedApplication.resume)
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    handleContactApplicant(
                      selectedApplication.email,
                      selectedApplication.phone
                    )
                  }
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Applicant
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
