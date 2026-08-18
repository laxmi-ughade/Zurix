import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { categoryApi } from "../services/categoryApi";
import { contactApi } from "../services/contactApi";
import { authApi } from "../services/authApi";
import { styleGuideApi } from "../services/styleGuideApi";
import { shopApi } from "../services/shopApi";

export const store = configureStore({
  reducer: {
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

setupListeners(store.dispatch);

export default store;