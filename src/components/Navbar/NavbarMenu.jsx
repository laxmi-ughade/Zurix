import React from "react";
import { Link } from "react-router-dom";
import PagesDropdown from "./PagesDropdown";

function NavbarMenu({ scrolled, isMobile = false, onItemClick }) {
  const menuClass = `
    text-sm md:text-[15px]
    font-semibold
    transition-all
    duration-200
    hover:text-orange-600
    ${scrolled || isMobile ? "text-neutral-900" : "text-white"}
  `;

  if (isMobile) {
    return (
      <div className="flex flex-col items-start gap-4 p-5 pb-6 bg-white rounded-b-2xl shadow-xl border-t border-neutral-100 max-h-[80vh] overflow-y-auto">
        <Link to="/" onClick={onItemClick} className={menuClass}>
          Home
        </Link>

        <Link to="/shop" onClick={onItemClick} className={menuClass}>
          Shop
        </Link>

        <PagesDropdown scrolled={true} isMobile={true} />

        <Link to="/blog" onClick={onItemClick} className={menuClass}>
          Blog
        </Link>

        <Link to="/contact" onClick={onItemClick} className={menuClass}>
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-6 lg:gap-8 px-4">
      <Link to="/" className={menuClass}>
        Home
      </Link>

      <Link to="/shop" className={menuClass}>
        Shop
      </Link>

      <PagesDropdown scrolled={scrolled} />

      <Link to="/blog" className={menuClass}>
        Blog
      </Link>

      <Link to="/contact" className={menuClass}>
        Contact Us
      </Link>
    </div>
  );
}

export default NavbarMenu;