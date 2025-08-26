import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
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
    }),
    // Job Application Endpoints
    submitJobApplication: builder.mutation({
      query: (applicationData) => ({
        url: "career-applications",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["JobApplication"],
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
    }),
    // Inquiry Endpoints
    submitInquiry: builder.mutation({
      query: (inquiryData) => ({
        url: "inquiries",
        method: "POST",
        body: inquiryData,
      }),
      invalidatesTags: ["Inquiry"],
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
    }),
    // Job Endpoints
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Job"],
    }),
    getJobs: builder.query({
      query: () => "jobs",
      providesTags: ["Job"],
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
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useDeleteInquiryMutation,
  useCreateJobMutation,
  useGetJobsQuery,
} = api;
