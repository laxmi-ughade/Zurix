import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function PagesDropdown({ scrolled, isMobile = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between py-1 text-sm font-medium text-black hover:opacity-70"
        >
          <span>Pages</span>
          <FiChevronDown
            size={15}
            className={`transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {mobileOpen && (
          <div className="ml-3 mt-2 space-y-2 border-l-2 border-orange-200 pl-3 text-xs font-medium text-neutral-700">
            <Link to="/about" className="block py-1 hover:text-orange-600">
              About Us
            </Link>
            <Link to="/faqs" className="block py-1 hover:text-orange-600">
              FAQs
            </Link>
            <Link to="/wishlist" className="block py-1 hover:text-orange-600">
              Wishlist
            </Link>
            <Link to="/cart" className="block py-1 hover:text-orange-600">
              Shopping Cart
            </Link>
            <Link to="/order-tracking" className="block py-1 hover:text-orange-600">
              Order Tracking
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className={`flex items-center gap-1 cursor-pointer rounded-full px-3 py-2 text-[15px] font-medium transition-all duration-300 hover:opacity-70 ${
          scrolled ? "text-black" : "text-white"
        }`}
      >
        <span>Pages</span>
        <FiChevronDown size={14} />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[100] mt-2 w-56 rounded-2xl bg-white p-2 text-black shadow-xl ring-1 ring-black/5"
      >
        <li>
          <Link to="/about" className="rounded-xl px-4 py-2 text-xs font-semibold hover:bg-neutral-100">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/faqs" className="rounded-xl px-4 py-2 text-xs font-semibold hover:bg-neutral-100">
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="rounded-xl px-4 py-2 text-xs font-semibold hover:bg-neutral-100">
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/cart" className="rounded-xl px-4 py-2 text-xs font-semibold hover:bg-neutral-100">
            Shopping Cart
          </Link>
        </li>
        <li>
          <Link to="/order-tracking" className="rounded-xl px-4 py-2 text-xs font-semibold hover:bg-neutral-100">
            Order Tracking
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PagesDropdown;