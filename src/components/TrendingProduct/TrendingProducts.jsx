import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaRegEye, FaCheck } from "react-icons/fa";
import { useGetProductsQuery } from "../../services/categoryApi";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "../../services/shopApi";

function TrendingProducts() {
  const [activeTab, setActiveTab] = useState("best-sellers");
  const [addedId, setAddedId] = useState(null);

  // RTK Query hooks
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery(activeTab);

  const { data: wishlistItems = [] } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  // Show only 8 products
  const displayedProducts = products.slice(0, 8);

  const handleAddToCart = async (product, e) => {
    e?.stopPropagation();
    try {
      await addToCart(product).unwrap();
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const handleToggleWishlist = async (product, e) => {
    e?.stopPropagation();
    const existing = wishlistItems.find((item) => String(item.id) === String(product.id));
    try {
      if (existing) {
        await removeFromWishlist(existing.id).unwrap();
      } else {
        await addToWishlist(product).unwrap();
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  };

  const isWishlisted = (productId) =>
    wishlistItems.some((item) => String(item.id) === String(productId));

  return (
    <section className="bg-white px-4 py-12 md:px-10 lg:px-16 md:py-20">
      {/* ================= HEADER ================= */}
      <div className="mb-8 md:mb-14 flex flex-col justify-between gap-4 md:gap-8 md:flex-row md:items-end">
        {/* TITLE */}
        <div>
          <p className="mb-3 md:mb-5 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Hot This Week
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            Trending right now
          </h2>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {/* BEST SELLERS */}
          <button
            onClick={() => setActiveTab("best-sellers")}
            className={`rounded-full px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-semibold transition cursor-pointer ${
              activeTab === "best-sellers"
                ? "bg-black text-white"
                : "border border-gray-200 bg-white text-gray-500 hover:text-black"
            }`}
          >
            Best Sellers
            <span
              className={`ml-1 md:ml-2 rounded-full px-2 py-1 text-xs ${
                activeTab === "best-sellers"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              24
            </span>
          </button>

          {/* NEW ARRIVALS */}
          <button
            onClick={() => setActiveTab("new-arrivals")}
            className={`rounded-full px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-semibold transition cursor-pointer ${
              activeTab === "new-arrivals"
                ? "bg-black text-white"
                : "border border-gray-200 bg-white text-gray-500 hover:text-black"
            }`}
          >
            New Arrivals
            <span
              className={`ml-1 md:ml-2 rounded-full px-2 py-1 text-xs ${
                activeTab === "new-arrivals"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              32
            </span>
          </button>
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {isLoading && (
        <div className="flex h-[400px] md:h-[500px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-orange-600"></span>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {isError && (
        <div className="alert alert-error mx-auto max-w-md text-sm md:text-base text-white">
          Failed to load products.
        </div>
      )}

      {/* ================= PRODUCTS ================= */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {displayedProducts.map((product) => {
            const inWishlist = isWishlisted(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div key={product.id} className="group relative">
                {/* ================= IMAGE CONTAINER ================= */}
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[520px] overflow-hidden rounded-lg md:rounded-[20px] bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* SALE BADGE */}
                  {product.sale && (
                    <span className="absolute left-3 md:left-5 top-3 md:top-5 rounded-full bg-red-500 px-3 md:px-4 py-1 md:py-2 text-xs font-bold text-white shadow-sm">
                      Sale!
                    </span>
                  )}

                  {/* ================= ACTION BUTTONS ================= */}
                  <div className="absolute right-3 md:right-5 top-3 md:top-5 flex flex-col gap-2 md:gap-3">
                    {/* VIEW / SHOP LINK */}
                    <Link
                      to={`/shop?gender=${product.gender || ""}&category=${product.category || ""}`}
                      className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-md transition hover:bg-black hover:text-white cursor-pointer"
                      title="View category"
                    >
                      <FaRegEye size={16} />
                    </Link>

                    {/* WISHLIST BUTTON */}
                    <button
                      onClick={(e) => handleToggleWishlist(product, e)}
                      type="button"
                      aria-label="Wishlist"
                      className={`flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border shadow-md transition cursor-pointer ${
                        inWishlist
                          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-black hover:text-white"
                      }`}
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {inWishlist ? <FaHeart size={16} className="text-red-500" /> : <FaRegHeart size={16} />}
                    </button>
                  </div>

                  {/* ================= ADD TO CART ================= */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    type="button"
                    className={`absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 h-12 md:h-16 rounded-full text-xs md:text-base font-bold transition duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 ${
                      isJustAdded
                        ? "bg-green-600 text-white opacity-100"
                        : "bg-black text-white opacity-90 group-hover:opacity-100 hover:bg-orange-600"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <FaCheck size={16} /> Added!
                      </>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>

                {/* ================= PRODUCT INFO ================= */}
                <div className="mt-3 md:mt-5">
                  <h3 className="text-sm md:text-base font-semibold text-black line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 md:gap-3">
                    <span className="text-sm md:text-base font-bold text-black">
                      ${product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs md:text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TrendingProducts;