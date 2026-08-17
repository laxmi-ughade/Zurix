import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import NavbarMenu from "./NavbarMenu";
import NavbarLogo from "./NavbarLogo";
import NavbarActions from "./NavbarActions";

import LoginModal from "../LoginModel";
import SearchModal from "./SearchModel";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  // ================= SCROLL =================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================= RESIZE =================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ================= WHITE PAGES =================
  const whiteNavbarPages = [
    "/shop",
    "/about",
    "/blog",
    "/contact",
    "/faqs",
    "/wishlist",
    "/cart",
    "/checkout",
    "/order-tracking",
    "/profile",
  ];

  const isWhitePage =
    whiteNavbarPages.includes(location.pathname) ||
    location.pathname.startsWith("/product-category/");

  // ================= NAVBAR STYLE =================
  const showWhiteNavbar = scrolled || isWhitePage;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`
          fixed
          left-1/2
          -translate-x-1/2
          z-[9999]

          w-[94%]
          sm:w-[95%]
          lg:w-[97%]

          h-16
          md:h-20

          transition-all
          duration-500

          ${
            showWhiteNavbar
              ? "top-0 w-full bg-white shadow-md xl:w-[100%]"
              : "top-3 md:top-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md"
          }
        `}
      >
        <div
          className="
            relative
            mx-auto
            flex
            h-full
            items-center
            justify-between
            px-3
            md:px-5
          "
        >
          {/* ================= LEFT MENU ================= */}
          <div className="hidden flex-1 md:block">
            <NavbarMenu scrolled={showWhiteNavbar} />
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              p-2
              transition-all
              md:hidden
              ${showWhiteNavbar ? "text-black" : "text-white"}
            `}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>

          {/* ================= CENTER LOGO ================= */}
          <div className="flex-1 md:flex-none">
            <NavbarLogo scrolled={showWhiteNavbar} />
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex flex-1 justify-end">
            <NavbarActions
              scrolled={showWhiteNavbar}
              onLogin={() => setLoginOpen(true)}
              onSearch={() => setSearchOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div
          className={`
            fixed
            left-0
            right-0
            top-16
            z-[9998]
            w-full
            md:hidden
            transition-all
            duration-300

            ${
              showWhiteNavbar
                ? "bg-white shadow-md"
                : "rounded-2xl bg-black/80 backdrop-blur-md"
            }
          `}
        >
          <NavbarMenu
            scrolled={showWhiteNavbar}
            isMobile={true}
            onItemClick={() => setMobileMenuOpen(false)}
          />

        </div>
      )}

      {/* ================= LOGIN MODAL ================= */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      {/* ================= SEARCH MODAL ================= */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

export default Navbar;