// redux/api.js
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
  tagTypes: ["User", "JobApplication"],
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
} = api;
