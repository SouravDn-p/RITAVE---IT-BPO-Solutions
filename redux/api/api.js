import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "JobApplication", "Inquiry", "Job"],
  endpoints: (builder) => ({
    // Auth Endpoints
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Registration successful!");
        } catch (error) {
          toast.error("Registration failed. Please try again.");
        }
      },
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Login successful!");
        } catch (error) {
          toast.error("Login failed. Please check your credentials.");
        }
      },
    }),
    // User Management Endpoints
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUserByEmail: builder.query({
      query: (email) => `users/${email}`,
      providesTags: (result, error, email) => [{ type: "User", id: email }],
    }),
    updateUser: builder.mutation({
      query: ({ email, data }) => ({
        url: `users/${email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { email }) => [
        { type: "User", id: email },
      ],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("User updated successfully!");
        } catch (error) {
          toast.error("Failed to update user. Please try again.");
        }
      },
    }),
    // Job Application Endpoints
    submitJobApplication: builder.mutation({
      query: (applicationData) => ({
        url: "career-applications",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["JobApplication"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Application submitted successfully!");
        } catch (error) {
          toast.error("Failed to submit application. Please try again.");
        }
      },
    }),
    getJobApplications: builder.query({
      query: () => "career-applications",
      providesTags: ["JobApplication"],
    }),
    deleteJobApplication: builder.mutation({
      query: (id) => ({
        url: "career-applications",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["JobApplication"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Application deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete application. Please try again.");
        }
      },
    }),
    updateJobApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: "career-applications/status",
        method: "PUT",
        body: { id, status },
      }),
      invalidatesTags: ["JobApplication"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Application status updated successfully!");
        } catch (error) {
          toast.error("Failed to update application status. Please try again.");
        }
      },
    }),
    // Inquiry Endpoints
    submitInquiry: builder.mutation({
      query: (inquiryData) => ({
        url: "inquiries",
        method: "POST",
        body: inquiryData,
      }),
      invalidatesTags: ["Inquiry"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Inquiry submitted successfully!");
        } catch (error) {
          toast.error("Failed to submit inquiry. Please try again.");
        }
      },
    }),
    getInquiries: builder.query({
      query: () => "inquiries",
      providesTags: ["Inquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: "inquiries",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Inquiry"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Inquiry deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete inquiry. Please try again.");
        }
      },
    }),
    updateInquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: "inquiries/status",
        method: "PUT",
        body: { id, status },
      }),
      invalidatesTags: ["Inquiry"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Inquiry status updated successfully!");
        } catch (error) {
          toast.error("Failed to update inquiry status. Please try again.");
        }
      },
    }),
    // Job Endpoints
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Job created successfully!");
        } catch (error) {
          toast.error("Failed to create job. Please try again.");
        }
      },
    }),
    getJobs: builder.query({
      query: () => "jobs",
      providesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...jobData }) => ({
        url: `jobs/${id}`,
        method: "PUT",
        body: jobData,
      }),
      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Job updated successfully!");
        } catch (error) {
          toast.error("Failed to update job. Please try again.");
        }
      },
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Job deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete job. Please try again.");
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
  useSubmitJobApplicationMutation,
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useUpdateJobApplicationStatusMutation,
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useDeleteInquiryMutation,
  useUpdateInquiryStatusMutation,
  useCreateJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = api;
