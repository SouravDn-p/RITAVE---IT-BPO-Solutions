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
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  useGetInquiriesQuery,
  useDeleteInquiryMutation,
} from "@/redux/api/api";

export default function InquiriesManagement() {
  const { data, error, isLoading } = useGetInquiriesQuery();
  const [deleteInquiry] = useDeleteInquiryMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const handleViewInquiry = (inquiryId: string) => {
    console.log(`Viewing inquiry: ${inquiryId}`);
    // Implementation for viewing inquiry details
  };

  const handleContactInquiry = (email: string, phone: string) => {
    console.log(`Contacting inquiry: ${email}, ${phone}`);
    // Implementation for contacting inquiry
  };

  const handleExportInquiries = () => {
    console.log("Exporting inquiries");
    // Implementation for exporting inquiries
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await deleteInquiry(id).unwrap();
      console.log(`Inquiry ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  const filteredInquiries =
    data?.inquiries?.filter(
      (inq) =>
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
    new: filteredInquiries.filter((inq) => inq.status === "new").length,
    inProgress: filteredInquiries.filter((inq) => inq.status === "in-progress")
      .length,
    completed: filteredInquiries.filter((inq) => inq.status === "completed")
      .length,
    responseRate: filteredInquiries.length
      ? Math.round(
          ((filteredInquiries.length -
            filteredInquiries.filter((inq) => inq.status === "new").length) /
            filteredInquiries.length) *
            100
        )
      : 0,
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading inquiries...</p>
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
      <Card className="border-border m-6">
        <CardContent className="pt-6 text-center">
          <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No inquiries available.</p>
        </CardContent>
      </Card>
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
                <Percent className="h-6 w-6 text-purple-500" />
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry) => (
                    <TableRow
                      key={inquiry.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {inquiry.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {inquiry.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{inquiry.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {inquiry.industry}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{inquiry.service}</TableCell>
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
                      <TableCell>
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
                      <TableCell>
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
                              onClick={() => handleViewInquiry(inquiry.id)}
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
    </div>
  );
}
