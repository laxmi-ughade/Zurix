import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiChevronRight,
  FiCheckCircle,
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
  FiMapPin,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartCoupon,
  clearCart,
} from "../features/cartSlice";
import { selectUser } from "../features/authSlice";
import { useCreateOrderMutation } from "../services/shopApi";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const coupon = useSelector(selectCartCoupon);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

  // Simple form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD' or 'Online'
  const [completedOrder, setCompletedOrder] = useState(null);
  const [formError, setFormError] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  // Pricing calculations
  const discountAmount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= 75 || subtotal === 0 ? 0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setFormError("");

    if (cartItems.length === 0) {
      setFormError("Your cart is empty.");
      return;
    }

    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setFormError("Please fill in your name, phone number, and delivery address.");
      return;
    }

    const orderId = `ZUX-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      userId: user?.id || "guest",
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim() || user?.email || "customer@example.com",
        phone: formData.phone.trim(),
        address: `${formData.address.trim()}${formData.city ? `, ${formData.city.trim()}` : ""}`,
      },
      items: cartItems,
      pricing: {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        shippingFee: Number(shippingFee.toFixed(2)),
        total: Number(finalTotal.toFixed(2)),
      },
      paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString(),
    };

    try {
      try {
        await createOrder(newOrder).unwrap();
      } catch (err) {
        console.warn("API save notice:", err);
      }

      // Save order in localStorage for tracking
      try {
        const stored = JSON.parse(localStorage.getItem("zurix_orders") || "[]");
        localStorage.setItem("zurix_orders", JSON.stringify([newOrder, ...stored]));
      } catch (err) {
        console.error(err);
      }

      dispatch(clearCart());
      setCompletedOrder(newOrder);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setFormError("Failed to place order. Please try again.");
    }
  };

  // ===================================
  // SUCCESS SCREEN
  // ===================================
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-neutral-100">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FiCheckCircle size={36} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Order Confirmed!
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Thank you, <strong className="text-neutral-900">{completedOrder.customer.name}</strong>. Your order has been placed successfully.
            </p>

            <div className="my-6 rounded-2xl bg-neutral-50 p-5 text-left text-xs sm:text-sm space-y-2 border border-neutral-200/60">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500 font-bold uppercase">Order ID</span>
                <span className="font-mono font-black text-orange-600">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-semibold text-neutral-800 text-right max-w-[220px] truncate">
                  {completedOrder.customer.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-semibold text-neutral-800">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-200">
                <span className="font-bold text-neutral-900">Total Paid/Due:</span>
                <span className="font-extrabold text-orange-600 text-base">
                  ${completedOrder.pricing.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={`/order-tracking?orderId=${completedOrder.id}`}
                className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-xs font-bold text-white hover:bg-orange-700 transition shadow"
              >
                <FiPackage size={15} />
                <span>Track Order</span>
              </Link>
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-xs font-bold text-neutral-800 hover:bg-neutral-200 transition"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100">
            <FiShoppingBag className="mx-auto text-neutral-400 mb-3" size={36} />
            <h2 className="text-xl font-bold text-neutral-900">Your Cart is Empty</h2>
            <p className="mt-1 text-xs text-neutral-500 mb-6">
              Add items from the shop before proceeding to checkout.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-black px-6 py-3 text-xs font-bold text-white hover:bg-orange-600 transition"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <Link to="/cart" className="hover:text-black transition">Cart</Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">Simple Checkout</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Quick & Simple Checkout
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Fill in your delivery address and choose how you'd like to pay.
          </p>
        </div>

        {formError && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm font-semibold text-red-600">
            {formError}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* LEFT: Simple Address & Payment (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              {/* Delivery Details */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-100 space-y-4">
                <h2 className="flex items-center gap-2 text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                  <FiMapPin className="text-orange-600" size={18} />
                  Delivery Details
                </h2>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Laxmi Sharma"
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="House/Apartment number, Street name"
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-100">
                <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-4">
                  Payment Option
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition cursor-pointer ${
                      paymentMethod === "COD"
                        ? "border-orange-600 bg-orange-50/60 ring-2 ring-orange-200 text-neutral-900 font-bold"
                        : "border-neutral-200 hover:bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    <FiDollarSign size={20} className="text-orange-600 mb-1" />
                    <span className="text-xs font-bold">Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-500">Pay when delivered</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Online")}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition cursor-pointer ${
                      paymentMethod === "Online"
                        ? "border-orange-600 bg-orange-50/60 ring-2 ring-orange-200 text-neutral-900 font-bold"
                        : "border-neutral-200 hover:bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    <FiCreditCard size={20} className="text-orange-600 mb-1" />
                    <span className="text-xs font-bold">Online / Card</span>
                    <span className="text-[10px] text-neutral-500">Card, UPI, PayPal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                  Order Summary ({cartItems.length} items)
                </h3>

                {/* Items summary preview */}
                <div className="mt-3 max-h-48 overflow-y-auto divide-y divide-neutral-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-bold text-neutral-800 truncate">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900 shrink-0">
                        ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="mt-4 border-t border-neutral-100 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount ({coupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-neutral-900">
                      {shippingFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-black text-neutral-900">
                    <span>Total Amount</span>
                    <span className="text-orange-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="mt-6 w-full rounded-full bg-black py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{isPlacingOrder ? "Placing Order..." : `Place Order • $${finalTotal.toFixed(2)}`}</span>
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
