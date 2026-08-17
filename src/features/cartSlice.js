import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem("zurix_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const getInitialCoupon = () => {
  try {
    const storedCoupon = localStorage.getItem("zurix_coupon");
    return storedCoupon ? JSON.parse(storedCoupon) : null;
  } catch {
    return null;
  }
};

const initialState = {
  items: getInitialCart(),
  coupon: getInitialCoupon(),
  notification: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const quantityToAdd = product.quantity || 1;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        state.items[existingItemIndex].quantity += quantityToAdd;
      } else {
        state.items.push({
          ...product,
          quantity: quantityToAdd,
        });
      }

      state.notification = {
        type: "success",
        message: `Added "${product.name}" to cart!`,
        timestamp: Date.now(),
      };

      localStorage.setItem("zurix_cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      localStorage.setItem("zurix_cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
      localStorage.setItem("zurix_cart", JSON.stringify(state.items));
    },

    applyCoupon: (state, action) => {
      const code = action.payload?.toUpperCase()?.trim();
      if (code === "WELCOME10") {
        state.coupon = { code: "WELCOME10", discountPercent: 10 };
        localStorage.setItem("zurix_coupon", JSON.stringify(state.coupon));
      } else if (code === "SAVE20") {
        state.coupon = { code: "SAVE20", discountPercent: 20 };
        localStorage.setItem("zurix_coupon", JSON.stringify(state.coupon));
      } else {
        state.coupon = null;
        localStorage.removeItem("zurix_coupon");
      }
    },

    removeCoupon: (state) => {
      state.coupon = null;
      localStorage.removeItem("zurix_coupon");
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      localStorage.removeItem("zurix_cart");
      localStorage.removeItem("zurix_coupon");
    },

    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
  clearNotification,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartNotification = (state) => state.cart.notification;

export default cartSlice.reducer;
