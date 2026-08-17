import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  endpoints: (builder) => ({

    // GET ALL USERS (for resilient auth fallback)
    getUsers: builder.query({
      query: () => "/users",
    }),

    // LOGIN
    login: builder.query({
      query: ({ email, password }) =>
        `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    }),

    // CHECK EMAIL
    getUserByEmail: builder.query({
      query: (email) =>
        `/users?email=${encodeURIComponent(email)}`,
    }),

    // REGISTER
    register: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),

  }),
});

export const {
  useLazyGetUsersQuery,
  useLazyLoginQuery,
  useLazyGetUserByEmailQuery,
  useRegisterMutation,
  useUpdateUserMutation,
} = authApi;