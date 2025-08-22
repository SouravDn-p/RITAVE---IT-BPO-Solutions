"use client";

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
} from "lucide-react";

// This would be fetched from MongoDB in a real implementation
const applications = [
  {
    id: "APP-001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    position: "Medical Claims Processor",
    experience: "2-5 years",
    status: "new",
    submittedAt: "2024-01-15T10:30:00Z",
    coverLetter:
      "I am excited to apply for the Medical Claims Processor position...",
    resumeUrl: "/resumes/john-smith-resume.pdf",
  },
  {
    id: "APP-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    position: "Full Stack Web Developer",
    experience: "3-5 years",
    status: "reviewed",
    submittedAt: "2024-01-14T14:20:00Z",
    coverLetter: "With 4 years of experience in React and Node.js...",
    resumeUrl: "/resumes/sarah-johnson-resume.pdf",
  },
  {
    id: "APP-003",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 345-6789",
    position: "BPO Operations Specialist",
    experience: "1-3 years",
    status: "interviewed",
    submittedAt: "2024-01-13T09:15:00Z",
    coverLetter: "I have extensive experience in BPO operations...",
    resumeUrl: "/resumes/michael-chen-resume.pdf",
  },
  {
    id: "APP-004",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 456-7890",
    position: "Customer Support Representative",
    experience: "1-2 years",
    status: "new",
    submittedAt: "2024-01-12T16:45:00Z",
    coverLetter:
      "I am passionate about providing excellent customer service...",
    resumeUrl: "/resumes/emily-rodriguez-resume.pdf",
  },
];

export default function ApplicationsManagement() {
  const handleViewApplication = (applicationId: string) => {
    console.log(`sd Viewing application: ${applicationId}`);
    // Implementation for viewing application details
  };

  const handleContactApplicant = (email: string, phone: string) => {
    console.log(`sd Contacting applicant: ${email}, ${phone}`);
    // Implementation for contacting applicant
  };

  const handleDownloadResume = (resumeUrl: string) => {
    console.log(`sd Downloading resume: ${resumeUrl}`);
    // Implementation for downloading resume
  };

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
          <Button
            variant="outline"
            className="cursor-pointer hover:scale-105 transition-transform bg-transparent"
            onClick={() => console.log("sd Exporting applications")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Applications
          </Button>
          <Button
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            onClick={() => console.log("sd Sending bulk emails")}
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
              <p className="text-2xl font-bold text-foreground">24</p>
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
              <p className="text-2xl font-bold text-foreground">12</p>
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
              <p className="text-2xl font-bold text-foreground">8</p>
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
              <p className="text-2xl font-bold text-foreground">78%</p>
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
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-accent/50 transition-colors bg-transparent"
                onClick={() => console.log("sd Opening filter options")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select className="px-3 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors">
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
              <select className="px-3 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:border-primary/50 transition-colors">
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
                {applications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {application.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {application.firstName} {application.lastName}
                        </p>
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
                              handleDownloadResume(application.resumeUrl)
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
                          <DropdownMenuItem className="text-destructive cursor-pointer">
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
        </CardContent>
      </Card>
    </div>
  );
}
