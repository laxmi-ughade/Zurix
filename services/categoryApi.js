import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
baseUrl: "https://zurix-1.onrender.com/"
  }),

  endpoints: (builder) => ({

    // Categories
    getCategories: builder.query({
      query: (gender) => `categories?gender=${gender}`,
    }),

    // Trending Products
    getProducts: builder.query({
      query: (type = "best-sellers") => `products?type=${encodeURIComponent(type)}`,
      transformResponse: (response) => (Array.isArray(response) ? response : []),
    }),

    getAllProducts: builder.query({
      query: () => "products",
      transformResponse: (response) => (Array.isArray(response) ? response : []),
    }),

    getStylingProducts: builder.query({
      query: () => "stylingProducts",
    }),

      getScrollCollections: builder.query({
      query: () => "scrollCollections",
    }),

      getStyleGuides: builder.query({
      query: () => "styleGuides",
    }),

    getTestimonials: builder.query({
    query: () => "testimonials",
}),

  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetStylingProductsQuery,
  useGetScrollCollectionsQuery,
  useGetStyleGuidesQuery,
   useGetTestimonialsQuery,
} = categoryApi;