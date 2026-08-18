import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const styleGuideApi = createApi({
  reducerPath: "styleGuideApi",

  baseQuery: fetchBaseQuery({
 baseUrl: import.meta.env.VITE_API_URL,
  }),

  tagTypes: ["StyleGuides"],

  endpoints: (builder) => ({
    getStyleGuides: builder.query({
      query: () => "styleGuides",
      providesTags: ["StyleGuides"],
    }),
  }),
});

export const {
  useGetStyleGuidesQuery,
} = styleGuideApi;