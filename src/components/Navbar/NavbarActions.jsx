import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiLogOut,
  FiPackage,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";

import { useGetCartQuery, useGetWishlistQuery } from "../../services/shopApi";

function NavbarActions({ scrolled, onLogin, onSearch }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // RTK Query for Cart & Wishlist live data
  const { data: cartItems = [] } = useGetCartQuery();
  const { data: wishlistItems = [] } = useGetWishlistQuery();

  // Calculate live badge counts directly from RTK Query cache
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (Number(item.quantity) || 1), 0)
    : 0;
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  // Active user session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(currentUser);

  // Sync auth state changes across windows/tabs/actions
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const stored = localStorage.getItem("user");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-changed", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    setCurrentUser(null);
    navigate("/");
  };

  const iconColorClass = scrolled ? "text-neutral-900" : "text-white";
  const avatarLetter = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center gap-2 sm:gap-4 md:gap-5 px-1 sm:px-3">
      {/* ================= SEARCH BUTTON ================= */}
      <button
        onClick={onSearch}
        type="button"
        aria-label="Search"
        className={`flex h-9 w-9 md:h-10 md:md:w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95 cursor-pointer ${iconColorClass}`}
      >
        <FiSearch size={19} />
      </button>

      {/* ================= WISHLIST BUTTON ================= */}
      <Link
        to="/wishlist"
        aria-label="Wishlist"
        className={`relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95 ${iconColorClass}`}
      >
        <FiHeart size={19} />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
      </Link>

      {/* ================= CART BUTTON ================= */}
      <Link
        to="/cart"
        aria-label="Shopping cart"
        className={`relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95 ${iconColorClass}`}
      >
        <FiShoppingBag size={19} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      {/* ================= USER / PROFILE DROPDOWN ================= */}
      <div className="relative" ref={dropdownRef}>
        {isAuthenticated ? (
          <div>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              type="button"
              className={`flex items-center gap-1.5 rounded-full p-1 transition hover:opacity-90 active:scale-95 cursor-pointer ${
                scrolled ? "bg-neutral-100" : "bg-white/20 backdrop-blur-md"
              }`}
              aria-label="User Profile Menu"
            >
              {/* User Avatar Circle */}
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-orange-600 text-xs sm:text-sm font-black text-white shadow-sm">
                {avatarLetter}
              </div>
              <FiChevronDown
                size={14}
                className={`mr-1 transition-transform duration-300 ${
                  profileDropdownOpen ? "rotate-180" : ""
                } ${iconColorClass}`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-black/10 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-600 text-base font-black text-white shadow-md">
                      {avatarLetter}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-bold text-white">
                          {currentUser?.name || "User"}
                        </p>
                        <FiCheckCircle className="shrink-0 text-orange-400" size={13} />
                      </div>
                      <p className="truncate text-xs text-neutral-300">
                        {currentUser?.email || "user@zurix.com"}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-orange-600/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-300 border border-orange-500/30">
                        Verified Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-2 space-y-1 py-1 text-sm font-medium text-neutral-700">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-neutral-100 hover:text-black transition"
                  >
                    <FiUser className="text-neutral-500" size={15} />
                    <span>My Account & Details</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold hover:bg-neutral-100 hover:text-black transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiHeart className="text-neutral-500" size={15} />
                      My Wishlist
                    </span>
                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold hover:bg-neutral-100 hover:text-black transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiShoppingBag className="text-neutral-500" size={15} />
                      Shopping Cart
                    </span>
                    {cartCount > 0 && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/order-tracking"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-neutral-100 hover:text-black transition"
                  >
                    <FiPackage className="text-neutral-500" size={15} />
                    <span>Track Orders</span>
                  </Link>
                </div>

                <hr className="my-1.5 border-neutral-100" />

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <FiLogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLogin}
            type="button"
            aria-label="Sign In"
            className={`flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95 cursor-pointer ${iconColorClass}`}
          >
            <FiUser size={19} />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavbarActions;