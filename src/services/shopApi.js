import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",

  baseQuery: fetchBaseQuery({
baseUrl: import.meta.env.VITE_API_URL,
  }),

  tagTypes: ["Wishlist", "Cart", "Orders"],

  endpoints: (builder) => ({
    // =========================
    // WISHLIST
    // =========================
    getWishlist: builder.query({
      query: () => "wishlist",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Wishlist", id })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),

    addToWishlist: builder.mutation({
      query: (product) => ({
        url: "wishlist",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Wishlist", id },
        { type: "Wishlist", id: "LIST" },
      ],
    }),

    clearWishlist: builder.mutation({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const listRes = await fetchWithBQ("wishlist");
          if (listRes.error) return { error: listRes.error };
          const items = listRes.data || [];
          await Promise.all(
            items.map((item) =>
              fetchWithBQ({
                url: `wishlist/${item.id}`,
                method: "DELETE",
              })
            )
          );
          return { data: { success: true } };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    // =========================
    // CART
    // =========================
    getCart: builder.query({
      query: () => "cart",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Cart", id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),

    addToCart: builder.mutation({
      async queryFn(product, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const cartRes = await fetchWithBQ("cart");
          if (cartRes.error) return { error: cartRes.error };
          const cartItems = cartRes.data || [];
          const existing = cartItems.find((item) => String(item.id) === String(product.id));

          if (existing) {
            const updatedQty = (Number(existing.quantity) || 1) + (Number(product.quantity) || 1);
            const patchRes = await fetchWithBQ({
              url: `cart/${existing.id}`,
              method: "PATCH",
              body: { quantity: updatedQty },
            });
            if (patchRes.error) return { error: patchRes.error };
            return { data: patchRes.data };
          } else {
            const postRes = await fetchWithBQ({
              url: "cart",
              method: "POST",
              body: {
                ...product,
                quantity: Number(product.quantity) || 1,
              },
            });
            if (postRes.error) return { error: postRes.error };
            return { data: postRes.data };
          }
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),

    updateCartQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: {
          quantity: Math.max(1, quantity),
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),

    clearCart: builder.mutation({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const cartRes = await fetchWithBQ("cart");
          if (cartRes.error) return { error: cartRes.error };
          const items = cartRes.data || [];
          await Promise.all(
            items.map((item) =>
              fetchWithBQ({
                url: `cart/${item.id}`,
                method: "DELETE",
              })
            )
          );
          return { data: { success: true } };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),

    // =========================
    // ORDERS
    // =========================
    getOrders: builder.query({
      query: () => "orders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Orders", id })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }],
    }),

    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    createOrder: builder.mutation({
      async queryFn(orderData, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const postRes = await fetchWithBQ({
            url: "orders",
            method: "POST",
            body: orderData,
          });
          if (postRes.error) return { error: postRes.error };

          // Clear cart on successful order
          const cartRes = await fetchWithBQ("cart");
          if (!cartRes.error && Array.isArray(cartRes.data)) {
            await Promise.all(
              cartRes.data.map((item) =>
                fetchWithBQ({
                  url: `cart/${item.id}`,
                  method: "DELETE",
                })
              )
            );
          }

          return { data: postRes.data };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
      invalidatesTags: [
        { type: "Orders", id: "LIST" },
        { type: "Cart", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,

  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useClearCartMutation,

  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = shopApi;