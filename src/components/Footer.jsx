import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaArrowRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* COLUMN 1 - LOGO */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              ZURIX<span className="text-orange-600">.</span>
            </h2>

            <p className="mt-4 max-w-[340px] text-xs sm:text-sm leading-relaxed text-gray-400">
              Thoughtful essentials for the considered wardrobe. Crafted with care, worn everywhere. Timeless over trend — since 1998.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-700 text-sm transition hover:bg-white hover:text-black"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-700 text-sm transition hover:bg-white hover:text-black"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-700 text-sm transition hover:bg-white hover:text-black"
              >
                <FaInstagram />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-700 text-sm transition hover:bg-white hover:text-black"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* COLUMN 2 - QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-base sm:text-lg font-bold text-white">
              Quick links
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/profile" className="transition hover:text-orange-500">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-orange-500">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition hover:text-orange-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="transition hover:text-orange-500">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-orange-500">
                  Shop All
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - INFORMATION */}
          <div>
            <h3 className="mb-4 text-base sm:text-lg font-bold text-white">
              Information
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/about" className="transition hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="transition hover:text-orange-500">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-orange-500">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition hover:text-orange-500">
                  Fashion Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 - NEWSLETTER */}
          <div>
            <h3 className="text-base sm:text-xl font-bold tracking-tight text-white">
              Let's get in touch
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Sign up for our newsletter and receive 10% off your next order.
            </p>

            {/* EMAIL FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to the Zurix newsletter!");
              }}
              className="mt-4 flex h-12 items-center rounded-full bg-neutral-900 border border-neutral-700 p-1.5 focus-within:border-orange-500 transition"
            >
              <input
                type="email"
                required
                placeholder="Your email address..."
                className="min-w-0 flex-1 bg-transparent px-3 text-xs sm:text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-700"
              >
                <FaArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16 text-xs text-gray-500">
          {/* COPYRIGHT */}
          <p>© 2026 ZURIX. All rights reserved.</p>

          {/* PAYMENT METHODS */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
            <span>COD Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;