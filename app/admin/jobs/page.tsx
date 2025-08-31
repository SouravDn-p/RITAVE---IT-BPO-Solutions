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
  Edit,
  Plus,
  Inbox,
  FileText,
} from "lucide-react";
import { useGetJobsQuery, useDeleteJobMutation } from "@/redux/api/api";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsManagement() {
  const router = useRouter();
  const { data, error, isLoading } = useGetJobsQuery(undefined);
  const [deleteJob] = useDeleteJobMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleCreateJob = () => {
    router.push("/admin/create-job");
  };

  const handleEditJob = (id: string) => {
    router.push(`/admin/edit-job?id=${id}`);
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Failed to delete job:", error);
    }
  };

  const filteredJobs =
    data?.jobs?.filter(
      (job: any) =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (departmentFilter
          ? job.department
              .toLowerCase()
              .includes(departmentFilter.toLowerCase())
          : true)
    ) || [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
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
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
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
      <div className="p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <p className="text-destructive">
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }

  if (!filteredJobs.length && !searchTerm && !departmentFilter) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Job Management
          </h1>
          <p className="text-muted-foreground">
            Manage job postings and career opportunities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Edit className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">
                  Engineering Jobs
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Plus className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">
                  Full-time Positions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty state */}
        <Card className="border-border">
          <CardContent className="pt-12 pb-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No Jobs Posted Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              When you create job postings, they will appear here.
            </p>
            <Button
              className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={handleCreateJob}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
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
            Job Management
          </h1>
          <p className="text-muted-foreground">
            Manage job postings and career opportunities
          </p>
        </div>
        <Button
          className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          onClick={handleCreateJob}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {filteredJobs.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-yellow-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Edit className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {
                  filteredJobs.filter(
                    (job: any) => job.department.toLowerCase() === "engineering"
                  ).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Engineering Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {
                  filteredJobs.filter(
                    (job: any) => job.type.toLowerCase() === "full-time"
                  ).length
                }
              </p>
              <p className="text-sm text-muted-foreground">
                Full-time Positions
              </p>
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
                  placeholder="Search jobs by title, department, or location..."
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
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-serif">All Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredJobs.length === 0 && (searchTerm || departmentFilter) ? (
            <p className="text-muted-foreground text-center">
              No results found for your search or filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Department
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Experience
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job: any) => (
                    <TableRow
                      key={job.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                          <div className="md:hidden">
                            <Badge
                              variant="outline"
                              className="border-primary/50 text-primary mr-1 text-xs"
                            >
                              {job.department}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {job.type}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className="border-primary/50 text-primary"
                        >
                          {job.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {job.location}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{job.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {job.experience}
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
                              onClick={() => handleEditJob(job.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Job
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Job
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
