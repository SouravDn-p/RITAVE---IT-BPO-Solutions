"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetJobsQuery,
} from "@/redux/api/api";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Separate component that uses useSearchParams
function EditJobContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const { data: jobsData } = useGetJobsQuery();

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  // Load job data when editing
  useEffect(() => {
    if (jobId && jobsData?.jobs) {
      const jobToEdit = jobsData.jobs.find((job) => job.id === jobId);
      if (jobToEdit) {
        setFormData({
          title: jobToEdit.title,
          department: jobToEdit.department,
          location: jobToEdit.location,
          type: jobToEdit.type,
          experience: jobToEdit.experience,
          description: jobToEdit.description,
          requirements: jobToEdit.requirements.join("\n"),
          responsibilities: jobToEdit.responsibilities.join("\n"),
        });
      }
    }
  }, [jobId, jobsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      requirements: formData.requirements
        .split("\n")
        .filter((line) => line.trim()),
      responsibilities: formData.responsibilities
        .split("\n")
        .filter((line) => line.trim()),
    };

    try {
      let result;
      if (jobId) {
        // Update existing job
        result = await updateJob({ id: jobId, ...jobData }).unwrap();
      } else {
        // Create new job
        result = await createJob(jobData).unwrap();
      }

      if (result.success) {
        toast.success(
          jobId ? "Job updated successfully!" : "Job created successfully!"
        );
        // Redirect to jobs list after 2 seconds
        setTimeout(() => router.push("/admin/jobs"), 2000);
      } else {
        toast.error(jobId ? "Failed to update job." : "Failed to create job.");
      }
    } catch (err) {
      toast.error(
        jobId
          ? "An error occurred. Please try again."
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {jobId ? "Edit Job" : "Create New Job"}
          </h1>
          <p className="text-muted-foreground">
            {jobId
              ? "Update job details"
              : "Add a new career opportunity for applicants"}
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/jobs")}>
          Back to Jobs
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-foreground"
                >
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-foreground"
                >
                  Department *
                </label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-foreground"
                >
                  Location *
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Remote, New York"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="text-sm font-medium text-foreground"
                >
                  Type *
                </label>
                <Input
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Full-time, Part-time"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="experience"
                className="text-sm font-medium text-foreground"
              >
                Experience *
              </label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="e.g., 3-5 years"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description *
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Provide a detailed description of the role..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="requirements"
                className="text-sm font-medium text-foreground"
              >
                Requirements (one per line)
              </label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Enter one requirement per line&#10;e.g., Bachelor's degree in Computer Science&#10;3+ years of experience in React"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="responsibilities"
                className="text-sm font-medium text-foreground"
              >
                Responsibilities (one per line)
              </label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Enter one responsibility per line&#10;e.g., Develop and maintain web applications&#10;Collaborate with cross-functional teams"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating || isCreating}>
                {isUpdating || isCreating
                  ? "Saving..."
                  : jobId
                  ? "Update Job"
                  : "Create Job"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/jobs")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading fallback component
function EditJobLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditJob() {
  return (
    <Suspense fallback={<EditJobLoading />}>
      <EditJobContent />
    </Suspense>
  );
}
