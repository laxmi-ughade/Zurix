import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FiSearch,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { useGetOrdersQuery } from "../services/shopApi";

function OrderTracking() {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchError, setSearchError] = useState("");

  const { data: apiOrders = [] } = useGetOrdersQuery();

  const handleSearch = (targetId) => {
    setSearchError("");
    const idToSearch = (targetId || orderQuery).trim().toUpperCase();

    if (!idToSearch) {
      setSearchError("Please enter an Order ID.");
      return;
    }

    // Check in API orders
    let found = Array.isArray(apiOrders)
      ? apiOrders.find(
          (o) =>
            o.id?.toUpperCase() === idToSearch ||
            o.customer?.email?.toLowerCase() === idToSearch.toLowerCase()
        )
      : null;

    // Fallback: check in localStorage
    if (!found) {
      try {
        const storedOrders = JSON.parse(
          localStorage.getItem("zurix_orders") || "[]"
        );
        found = storedOrders.find(
          (o) =>
            o.id?.toUpperCase() === idToSearch ||
            o.customer?.email?.toLowerCase() === idToSearch.toLowerCase()
        );
      } catch (e) {
        console.error(e);
      }
    }

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setSearchError(`No order found matching "${idToSearch}".`);
    }
  };

  // Auto-search if initialOrderId is present
  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId, apiOrders]);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">Order Tracking</span>
        </div>

        {/* Header */}
        <div className="mt-6 mb-8 text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            Live Updates
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Track Your Shipment
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Enter your order number or email to view real-time delivery status and shipment timeline.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ZUX-123456)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="h-13 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-semibold uppercase text-neutral-900 outline-none placeholder:text-neutral-400 placeholder:normal-case shadow-sm focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="h-13 rounded-2xl bg-black px-8 text-sm font-bold text-white shadow transition hover:bg-orange-600 cursor-pointer"
            >
              Track Order
            </button>
          </form>

          {searchError && (
            <p className="mt-3 text-xs font-semibold text-red-600">{searchError}</p>
          )}
        </div>

        {/* ORDER DETAILS */}
        {searchedOrder && (
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-neutral-100 space-y-8 animate-in fade-in duration-300">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-6 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Tracking Code
                </p>
                <h2 className="text-2xl font-black text-neutral-900 font-mono">
                  {searchedOrder.id}
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {searchedOrder.status || "In Transit"}
                </span>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6">
                Delivery Timeline
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white font-bold shadow">
                    <FiCheckCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Order Placed</p>
                    <p className="text-[11px] text-neutral-500">Confirmed</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white font-bold shadow">
                    <FiPackage size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Processing</p>
                    <p className="text-[11px] text-neutral-500">Prepared in warehouse</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white font-bold shadow">
                    <FiTruck size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">In Transit</p>
                    <p className="text-[11px] text-neutral-500">On the way to hub</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 opacity-60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 font-bold">
                    <FiClock size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Delivery</p>
                    <p className="text-[11px] text-neutral-500">
                      Est. {searchedOrder.estimatedDelivery || "4 business days"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-neutral-100 pt-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <p className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <FiMapPin className="text-orange-600" /> Shipping Address
                </p>
                <p className="text-neutral-600">{searchedOrder.customer?.name}</p>
                <p className="text-neutral-500">{searchedOrder.customer?.address}</p>
                <p className="text-neutral-500">{searchedOrder.customer?.email}</p>
              </div>

              <div className="space-y-1.5 sm:text-right">
                <p className="font-bold text-neutral-900 flex sm:justify-end items-center gap-1.5">
                  <FiCalendar className="text-orange-600" /> Shipping Method
                </p>
                <p className="text-neutral-600">{searchedOrder.shippingMethod}</p>
                <p className="text-neutral-500">Payment: {searchedOrder.paymentMethod}</p>
                <p className="font-extrabold text-neutral-900 text-base">
                  Total: ${searchedOrder.pricing?.total?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Items in this order */}
            {searchedOrder.items && searchedOrder.items.length > 0 && (
              <div className="border-t border-neutral-100 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Items in this order ({searchedOrder.items.length})
                </h4>
                <div className="divide-y divide-neutral-100">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            Qty: {item.quantity || 1} × ${item.price}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-neutral-900">
                        ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracking;