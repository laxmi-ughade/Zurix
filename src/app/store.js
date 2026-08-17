import { configureStore } from "@reduxjs/toolkit";

import { categoryApi } from "../services/categoryApi";
import { contactApi } from "../services/contactApi";
import { authApi } from "../services/authApi";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";
import { styleGuideApi } from "../services/styleGuideApi";
import { shopApi } from "../services/shopApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,

    [categoryApi.reducerPath]: categoryApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [styleGuideApi.reducerPath]: styleGuideApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(contactApi.middleware)
      .concat(authApi.middleware)
      .concat(styleGuideApi.middleware)
      .concat(shopApi.middleware),
});