"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateJobMutation } from "@/redux/api/api";
import { AlertTriangle } from "lucide-react";

export default function CreateJob() {
  const [createJob, { isLoading, error }] = useCreateJobMutation();
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
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

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
      const result = await createJob(jobData).unwrap();
      if (result.success) {
        setSubmitMessage("Job created successfully!");
        setFormData({
          title: "",
          department: "",
          location: "",
          type: "",
          experience: "",
          description: "",
          requirements: "",
          responsibilities: "",
        });
      } else {
        setSubmitMessage("Failed to create job.");
      }
    } catch (err) {
      setSubmitMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-serif font-bold text-foreground">
        Create New Job
      </h1>
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>
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
              />
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
              />
            </div>
            {error && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 mr-2 inline" />
                Failed to create job. Please try again.
              </div>
            )}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage.includes("success")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
