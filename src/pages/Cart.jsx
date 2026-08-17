import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiChevronRight,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiShoppingBag,
  FiTag,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartCoupon,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "../features/cartSlice";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const coupon = useSelector(selectCartCoupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const FREE_SHIPPING_THRESHOLD = 75;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

  const discountAmount = coupon
    ? (subtotal * (coupon.discountPercent / 100))
    : 0;

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const taxAmount = (subtotal - discountAmount) * 0.08; // 8% estimated tax
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "WELCOME10" || code === "SAVE20") {
      dispatch(applyCoupon(code));
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try WELCOME10 or SAVE20.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div className="mt-6 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-neutral-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900">
                Shopping Cart
              </h1>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              Review your items before proceeding to secure checkout.
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-red-600 transition cursor-pointer"
            >
              <FiTrash2 size={14} /> Clear Cart
            </button>
          )}
        </div>

        {/* CART CONTENT */}
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-sm border border-neutral-100">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <FiShoppingBag size={36} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Your shopping bag is empty
            </h2>

            <p className="mt-3 max-w-md text-sm text-neutral-500">
              Looks like you haven't added anything to your cart yet. Explore our curated collections to find your perfect style.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              <span>Explore Products</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Bar */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-neutral-100">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-2 text-neutral-800">
                    <FiTruck className="text-orange-600" size={18} />
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-green-700 font-bold">
                        🎉 You've unlocked FREE standard delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-orange-600">${amountNeeded}</strong> more to qualify for Free Shipping!
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-neutral-600">
                    {progressToFreeShipping}%
                  </span>
                </div>
                {/* Bar */}
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 hover:bg-neutral-50/50 transition"
                  >
                    {/* Thumbnail & Meta */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                          {item.category || item.gender || "Zurix Apparel"}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Unit Price: <span className="font-semibold text-neutral-800">${item.price}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                      {/* Stepper */}
                      <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: (item.quantity || 1) - 1,
                              })
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={13} />
                        </button>

                        <span className="w-9 text-center text-xs font-bold text-neutral-900">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: (item.quantity || 1) + 1,
                              })
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={13} />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-right min-w-[70px]">
                        <p className="text-base font-extrabold text-neutral-900">
                          ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                        title="Remove from cart"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/shop"
                  className="text-xs sm:text-sm font-bold text-neutral-700 hover:text-orange-600 transition flex items-center gap-1.5"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Promo Code Card */}
              <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-100">
                <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <FiTag className="text-orange-600" />
                  Have a Promo Code?
                </h3>

                {coupon ? (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-orange-50 border border-orange-200 p-3">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-orange-600" size={16} />
                      <span className="text-xs font-bold text-orange-950">
                        {coupon.code} ({coupon.discountPercent}% OFF)
                      </span>
                    </div>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="mt-3 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. WELCOME10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="h-11 flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-semibold text-neutral-900 uppercase placeholder:text-neutral-400 placeholder:normal-case outline-none focus:border-orange-500 focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-black px-4 text-xs font-bold text-white transition hover:bg-orange-600 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] font-semibold text-red-600">
                        {couponError}
                      </p>
                    )}
                    <p className="text-[11px] text-neutral-400">
                      Try using promo code: <span className="font-mono font-bold text-orange-600">WELCOME10</span>
                    </p>
                  </form>
                )}
              </div>

              {/* Summary Breakdown Card */}
              <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                  Order Summary
                </h3>

                <div className="mt-4 space-y-3 text-xs sm:text-sm">
                  {/* Subtotal */}
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Coupon Discount */}
                  {coupon && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount ({coupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-neutral-900">
                      {shippingFee === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-neutral-900">
                      ${taxAmount.toFixed(2)}
                    </span>
                  </div>

                  <hr className="border-neutral-100 my-2" />

                  {/* Total */}
                  <div className="flex items-center justify-between text-base sm:text-lg font-extrabold text-neutral-900">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600 cursor-pointer active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight size={16} />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-4 text-center text-[10px] text-neutral-500">
                  <div className="flex flex-col items-center gap-1">
                    <FiShield className="text-orange-600" size={16} />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <FiTruck className="text-orange-600" size={16} />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <FiRotateCcw className="text-orange-600" size={16} />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
