import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { useGetAllProductsQuery } from "../../services/categoryApi";

function SearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const { data: products = [] } = useGetAllProductsQuery();

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = search.trim()
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.category?.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.gender?.toLowerCase().includes(search.trim().toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-3"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center border-b border-neutral-100 px-4 sm:px-6 py-3">
          <FiSearch size={22} className="text-neutral-400 mr-3 shrink-0" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dresses, tops, jackets, jeans..."
            autoFocus
            className="flex-1 h-12 text-sm sm:text-base outline-none text-neutral-900 placeholder:text-neutral-400 bg-transparent font-medium"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 text-xs font-semibold"
            >
              Clear
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white transition cursor-pointer"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Search Results / Empty State */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {search.trim() ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
                </p>
                <div className="divide-y divide-neutral-100">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop?gender=${product.gender || ""}&category=${product.category || ""}`}
                      onClick={onClose}
                      className="flex items-center justify-between py-2.5 px-2 hover:bg-neutral-50 rounded-xl transition group"
                    >
                      <div className="flex items-center gap-3 truncate pr-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition truncate">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 uppercase font-semibold">
                            {product.gender} • {product.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
                          ${product.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/shop`}
                  onClick={onClose}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-neutral-100 py-2.5 text-xs font-bold text-neutral-800 hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  <span>View All Shop Products</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="py-10 text-center text-neutral-400">
                <p className="text-sm font-semibold text-neutral-700">No products found for "{search}"</p>
                <p className="text-xs mt-1">Try checking for typos or search for a category like "dresses", "shirts", or "jackets".</p>
              </div>
            )
          ) : (
            <div className="py-8 text-center text-neutral-400 space-y-3">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                  <FiSearch size={20} />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500">
                Type anything to instantly search across all men & women categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;