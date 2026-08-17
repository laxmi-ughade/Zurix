import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiChevronRight,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiHeart,
  FiCheck,
} from "react-icons/fi";
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";

function Wishlist() {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const [addedItemIds, setAddedItemIds] = React.useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      dispatch(addToCart(item));
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">Wishlist</span>
        </div>

        {/* Page Title & Controls */}
        <div className="mt-6 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-neutral-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900">
                My Wishlist
              </h1>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              Save your favorite items here and move them to cart whenever you're ready.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-orange-600 transition cursor-pointer"
              >
                <FiShoppingBag size={15} />
                <span>Move All to Cart</span>
              </button>

              <button
                onClick={() => dispatch(clearWishlist())}
                className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
              >
                <FiTrash2 size={15} />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-sm border border-neutral-100">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <FiHeart size={36} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm text-neutral-500">
              Explore our trending collections and tap the heart icon on any product to save it for later.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              <span>Start Shopping</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const isAdded = Boolean(addedItemIds[product.id]);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-sm transition duration-300 hover:shadow-md"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[0.8] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {product.sale && (
                      <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                        Sale!
                      </span>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md backdrop-blur-sm transition hover:bg-red-600 hover:text-white cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>

                  {/* Info & CTA */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      {/* Gender / Category */}
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        {product.gender && <span>{product.gender}</span>}
                        {product.category && (
                          <>
                            <span>•</span>
                            <span>{product.category}</span>
                          </>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="mt-1 text-sm font-bold text-neutral-900 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-base font-extrabold text-neutral-900">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      type="button"
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer ${
                        isAdded
                          ? "bg-green-600 text-white"
                          : "bg-black text-white hover:bg-orange-600"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <FiCheck size={15} /> Added to Cart
                        </>
                      ) : (
                        <>
                          <FiShoppingBag size={15} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;