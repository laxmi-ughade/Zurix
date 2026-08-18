import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://zurix-1.onrender.com/",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // GET ALL USERS
    getUsers: builder.query({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // GET USER BY ID
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // LOGIN
    login: builder.query({
      query: ({ email, password }) =>
        `users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      providesTags: [{ type: "User", id: "SESSION" }],
    }),

    // CHECK EMAIL
    getUserByEmail: builder.query({
      query: (email) => `users?email=${encodeURIComponent(email)}`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    // REGISTER
    register: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useLazyLoginQuery,
  useLazyGetUserByEmailQuery,
  useRegisterMutation,
  useUpdateUserMutation,
} = authApi;