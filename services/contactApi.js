import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",

  baseQuery: fetchBaseQuery({
baseUrl: "https://zurix-1.onrender.com/"
  }),

  tagTypes: ["Messages"],

  endpoints: (builder) => ({

    // SEND MESSAGE
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "messages",
        method: "POST",
        body: {
          ...message,
          createdAt: new Date().toISOString(),
        },
      }),

      invalidatesTags: ["Messages"],
    }),

    // GET ALL MESSAGES
    getMessages: builder.query({
      query: () => "messages",
      providesTags: ["Messages"],
    }),

  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
} = contactApi;