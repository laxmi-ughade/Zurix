import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const styleGuideApi = createApi({
  reducerPath: "styleGuideApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
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