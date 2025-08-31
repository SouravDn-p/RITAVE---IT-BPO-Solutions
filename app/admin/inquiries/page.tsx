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
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Inbox,
} from "lucide-react";
import {
  useGetInquiriesQuery,
  useDeleteInquiryMutation,
  useUpdateInquiryStatusMutation,
} from "@/redux/api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function InquiriesManagement() {
  const { data, error, isLoading } = useGetInquiriesQuery(undefined);
  const [deleteInquiry] = useDeleteInquiryMutation();
  const [updateInquiryStatus] = useUpdateInquiryStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsDialogOpen(true);
  };

  const handleContactInquiry = (email: string, phone: string) => {
    // Open email client
    window.location.href = `mailto:${email}`;
    toast.info(`Opening email client for ${email}`);
  };

  const handleExportInquiries = () => {
    toast.info("Export feature coming soon");
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await deleteInquiry(id).unwrap();
      toast.success("Inquiry deleted successfully");
    } catch (error) {
      toast.error("Failed to delete inquiry");
      console.error("Failed to delete inquiry:", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const result = await updateInquiryStatus({ id, status }).unwrap();
      if (result.success) {
        toast.success(`Inquiry status updated to ${status}`);
      } else {
        toast.error(
          `Failed to update status: ${result.message || "Unknown error"}`
        );
        console.error("Update failed:", result);
      }
    } catch (error: any) {
      console.error("Failed to update inquiry status:", error);
      toast.error(
        `Failed to update status: ${
          error?.data?.message || error?.message || "Unknown error"
        }`
      );
    }
  };

  const filteredInquiries =
    data?.inquiries?.filter(
      (inq: any) =>
        (inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inq.service.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? inq.status === statusFilter : true) &&
        (serviceFilter
          ? inq.service.toLowerCase().includes(serviceFilter.toLowerCase())
          : true)
    ) || [];

  const stats = {
    new: filteredInquiries.filter((inq: any) => inq.status === "new").length,
    inProgress: filteredInquiries.filter(
      (inq: any) => inq.status === "in-progress"
    ).length,
    completed: filteredInquiries.filter(
      (inq: any) => inq.status === "completed"
    ).length,
    responseRate: filteredInquiries.length
      ? Math.round(
          ((filteredInquiries.length -
            filteredInquiries.filter((inq: any) => inq.status === "new")
              .length) /
            filteredInquiries.length) *
            100
        )
      : 0,
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-8 mx-auto mb-1" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters skeleton */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table skeleton */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-16" />
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
      <Card className="border-border m-6">
        <CardContent className="pt-6 text-center">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-destructive">
            Failed to load inquiries. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (
    !filteredInquiries.length &&
    !searchTerm &&
    !statusFilter &&
    !serviceFilter
  ) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Inquiry Management
          </h1>
          <p className="text-muted-foreground">
            View and manage customer inquiries and leads
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">New Inquiries</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty state */}
        <Card className="border-border">
          <CardContent className="pt-12 pb-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No Inquiries Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              When customers reach out, their inquiries will appear here.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                className="cursor-pointer hover:scale-105 transition-transform bg-transparent"
                onClick={() => toast.info("Export feature coming soon")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Mail className="h-4 w-4 mr-2" />
                Send Follow-up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Inquiry Management
          </h1>
          <p className="text-muted-foreground">
            View and manage customer inquiries and leads
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer hover:scale-105 transition-transform bg-transparent"
            onClick={handleExportInquiries}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Mail className="h-4 w-4 mr-2" />
            Send Follow-up
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.new}</p>
              <p className="text-sm text-muted-foreground">New Inquiries</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-yellow-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.inProgress}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.completed}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Info className="h-6 w-6 text-purple-500" />
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
                  placeholder="Search inquiries by name, email, company, or service..."
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
                onClick={() => toast.info("Filter options coming soon")}
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
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="">All Services</option>
                <option value="medical-claims">Medical Claims</option>
                <option value="web-development">Web Development</option>
                <option value="remote-staffing">Remote Staffing</option>
                <option value="data-processing">Data Processing</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-serif">All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInquiries.length === 0 &&
          (searchTerm || statusFilter || serviceFilter) ? (
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No results found for your search or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden lg:table-cell">ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Company
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Service
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Priority
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry: any) => (
                    <TableRow
                      key={inquiry.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="hidden lg:table-cell font-medium">
                        {inquiry.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {inquiry.email}
                          </p>
                          <p className="text-sm text-muted-foreground md:hidden">
                            {inquiry.company} • {inquiry.service}
                          </p>
                          <p className="text-xs text-muted-foreground md:hidden">
                            {new Date(inquiry.date).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <p className="font-medium">{inquiry.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {inquiry.industry}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {inquiry.service}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inquiry.status === "new"
                              ? "default"
                              : inquiry.status === "in-progress"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            inquiry.status === "new"
                              ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                              : inquiry.status === "in-progress"
                              ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                              : "bg-green-500/10 text-green-600 border-green-500/20"
                          }
                        >
                          {inquiry.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            inquiry.priority === "high"
                              ? "destructive"
                              : inquiry.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {inquiry.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(inquiry.date).toLocaleDateString()}
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
                              onClick={() => handleViewInquiry(inquiry)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleContactInquiry(
                                  inquiry.email,
                                  inquiry.phone
                                )
                              }
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleContactInquiry(
                                  inquiry.email,
                                  inquiry.phone
                                )
                              }
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="cursor-pointer">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Update Status
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleUpdateStatus(inquiry.id, "new")
                                  }
                                >
                                  New
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      inquiry.id,
                                      "in-progress"
                                    )
                                  }
                                >
                                  In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleUpdateStatus(inquiry.id, "completed")
                                  }
                                >
                                  Completed
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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

      {/* Inquiry Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-foreground">Name</h3>
                  <p className="text-muted-foreground">
                    {selectedInquiry.name}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="text-muted-foreground">
                    {selectedInquiry.email}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-muted-foreground">
                    {selectedInquiry.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Company</h3>
                  <p className="text-muted-foreground">
                    {selectedInquiry.company || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Service</h3>
                  <p className="text-muted-foreground">
                    {selectedInquiry.service}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Status</h3>
                  <Badge
                    variant={
                      selectedInquiry.status === "new"
                        ? "default"
                        : selectedInquiry.status === "in-progress"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      selectedInquiry.status === "new"
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                        : selectedInquiry.status === "in-progress"
                        ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                        : "bg-green-500/10 text-green-600 border-green-500/20"
                    }
                  >
                    {selectedInquiry.status.replace("-", " ")}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Priority</h3>
                  <Badge
                    variant={
                      selectedInquiry.priority === "high"
                        ? "destructive"
                        : selectedInquiry.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedInquiry.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Message</h3>
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {selectedInquiry.message || "No message provided."}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleContactInquiry(
                      selectedInquiry.email,
                      selectedInquiry.phone
                    )
                  }
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
