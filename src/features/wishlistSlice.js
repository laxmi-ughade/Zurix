import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const storedWishlist = localStorage.getItem("zurix_wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Failed to load wishlist from localStorage:", error);
    return [];
  }
};

const initialState = {
  items: getInitialWishlist(),
  notification: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
        state.notification = {
          type: "success",
          message: `Saved "${product.name}" to wishlist!`,
          timestamp: Date.now(),
        };
      }
      localStorage.setItem("zurix_wishlist", JSON.stringify(state.items));
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("zurix_wishlist", JSON.stringify(state.items));
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index > -1) {
        state.items.splice(index, 1);
        state.notification = {
          type: "info",
          message: `Removed "${product.name}" from wishlist.`,
          timestamp: Date.now(),
        };
      } else {
        state.items.push(product);
        state.notification = {
          type: "success",
          message: `Saved "${product.name}" to wishlist!`,
          timestamp: Date.now(),
        };
      }
      localStorage.setItem("zurix_wishlist", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("zurix_wishlist");
    },

    clearWishlistNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  clearWishlistNotification,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some((item) => item.id === productId);

export default wishlistSlice.reducer;
