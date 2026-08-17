import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),

  tagTypes: ["Wishlist", "Cart", "Orders"],

  endpoints: (builder) => ({

    // =========================
    // WISHLIST
    // =========================

    getWishlist: builder.query({
      query: () => "wishlist",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (product) => ({
        url: "wishlist",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // =========================
    // CART
    // =========================

    getCart: builder.query({
      query: () => "cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (product) => ({
        url: "cart",
        method: "POST",
        body: {
          ...product,
          quantity: product.quantity || 1,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: {
          quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    // =========================
    // ORDERS
    // =========================

    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,

  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,

  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = shopApi;