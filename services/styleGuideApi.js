import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const styleGuideApi = createApi({
  reducerPath: "styleGuideApi",

  baseQuery: fetchBaseQuery({
   baseUrl: "https://zurix-1.onrender.com/"
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