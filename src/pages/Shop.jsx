import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiGrid,
  FiList,
  FiSliders,
  FiCheck,
} from "react-icons/fi";
import { FaHeart, FaRegHeart, FaRegEye } from "react-icons/fa";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../services/categoryApi";
import { toggleWishlist, selectWishlistItems } from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";

function Shop() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [addedProductId, setAddedProductId] = useState(null);

  const { gender: pathGender, category: pathCategory } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active filters synced with URL
  const selectedGender = pathGender || searchParams.get("gender") || "";
  const selectedCategory = pathCategory || searchParams.get("category") || "";
  const selectedColor = searchParams.get("color") || "";
  const selectedSize = searchParams.get("size") || "";
  const selectedTag = searchParams.get("tag") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 10;
  const maxPrice = Number(searchParams.get("maxPrice")) || 200;
  const sortBy = searchParams.get("sortBy") || "default";

  // UI state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [cols, setCols] = useState(4); // 3 or 4 columns, or 1 (list)
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
    tags: true,
  });

  // API calls
  const { data: products = [], isLoading, isError } = useGetAllProductsQuery();
  const { data: womenCategories = [] } = useGetCategoriesQuery("women");
  const { data: menCategories = [] } = useGetCategoriesQuery("men");

  // Toggle sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper to update filters
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // If gender changes, reset category since it might not apply
    if (key === "gender") {
      newParams.delete("category");
    }

    if (pathGender || pathCategory) {
      // If we are currently on a path route, transition to query-based /shop route on interaction
      const currentGender = key === "gender" ? value : selectedGender;
      const currentCategory = key === "category" ? value : (key === "gender" ? "" : selectedCategory);
      
      if (currentGender) newParams.set("gender", currentGender);
      else newParams.delete("gender");

      if (currentCategory) newParams.set("category", currentCategory);
      else newParams.delete("category");

      navigate(`/shop?${newParams.toString()}`);
    } else {
      setSearchParams(newParams);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    if (pathGender || pathCategory) {
      navigate("/shop");
    } else {
      setSearchParams(new URLSearchParams());
    }
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    if (selectedGender && product.gender !== selectedGender) return false;
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedColor && product.color !== selectedColor) return false;
    if (selectedSize && product.size !== selectedSize) return false;
    if (selectedTag && !product.tags?.includes(selectedTag)) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // default (no sorting)
  });

  // Banner metadata
  let bannerTitle = "Shop All";
  let bannerImg =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";

  if (selectedGender === "women") {
    bannerTitle = selectedCategory ? `Women — ${selectedCategory}` : "Women";
    bannerImg =
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop";
  } else if (selectedGender === "men") {
    bannerTitle = selectedCategory ? `Men — ${selectedCategory}` : "Men";
    bannerImg =
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1600&auto=format&fit=crop";
  }

  // Active filters list
  const activeFiltersList = [];
  if (selectedGender) activeFiltersList.push({ key: "gender", label: selectedGender === "women" ? "Women" : "Men" });
  if (selectedCategory) activeFiltersList.push({ key: "category", label: selectedCategory });
  if (selectedColor) activeFiltersList.push({ key: "color", label: `Color: ${selectedColor}` });
  if (selectedSize) activeFiltersList.push({ key: "size", label: `Size: ${selectedSize}` });
  if (selectedTag) activeFiltersList.push({ key: "tag", label: `Tag: ${selectedTag}` });
  if (minPrice > 10 || maxPrice < 200) activeFiltersList.push({ key: "price", label: `$${minPrice} - $${maxPrice}` });

  const removeFilterTag = (item) => {
    if (item.key === "price") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
      setSearchParams(newParams);
    } else {
      updateFilter(item.key, "");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20 pb-16 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= BREADCRUMBS & BANNER ================= */}
        <div className="relative mb-10 overflow-hidden rounded-[24px] bg-black shadow-lg">
          {/* Banner Image */}
          <div className="absolute inset-0">
            <img
              src={bannerImg}
              alt={bannerTitle}
              className="h-full w-full object-cover opacity-65 transition-transform duration-[1.5s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30"></div>
          </div>

          {/* Banner Text */}
          <div className="relative z-10 flex flex-col items-center justify-center py-20 text-center text-white sm:py-28">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {bannerTitle}
            </h1>
            <nav className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-white transition">Shop</Link>
              {selectedGender && (
                <>
                  <span>/</span>
                  <button
                    onClick={() => {
                      updateFilter("gender", selectedGender);
                      updateFilter("category", "");
                    }}
                    className="hover:text-white transition uppercase font-semibold cursor-pointer"
                  >
                    {selectedGender}
                  </button>
                </>
              )}
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span className="text-orange-500 font-bold">{selectedCategory}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* ================= FILTERS & PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-8">
          
          {/* ================= SIDEBAR FILTERS (DESKTOP) ================= */}
          <aside className="hidden lg:col-span-2 lg:block space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-black flex items-center gap-2">
                  <FiSliders size={18} className="text-orange-600" />
                  Filters
                </h3>
                {activeFiltersList.length > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-orange-600 hover:text-black transition cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* CATEGORIES SECTION */}
              <div className="py-4 border-b border-gray-100">
                <button
                  onClick={() => toggleSection("categories")}
                  className="flex w-full items-center justify-between font-bold text-black hover:opacity-75 cursor-pointer"
                >
                  Categories
                  {openSections.categories ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openSections.categories && (
                  <div className="mt-4 space-y-4">
                    {/* Women's Section */}
                    <div>
                      <button
                        onClick={() => updateFilter("gender", "women")}
                        className={`text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                          selectedGender === "women" ? "text-orange-600" : "text-black hover:text-orange-600"
                        }`}
                      >
                        Women
                      </button>
                      <ul className="mt-2 pl-3 space-y-2 border-l border-gray-100">
                        {womenCategories.map((cat) => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                updateFilter("gender", "women");
                                updateFilter("category", cat.name);
                              }}
                              className={`text-sm transition text-left w-full cursor-pointer ${
                                selectedGender === "women" && selectedCategory === cat.name
                                  ? "text-orange-600 font-semibold"
                                  : "text-gray-500 hover:text-black"
                              }`}
                            >
                              {cat.name} ({cat.count})
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Men's Section */}
                    <div className="pt-2">
                      <button
                        onClick={() => updateFilter("gender", "men")}
                        className={`text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                          selectedGender === "men" ? "text-orange-600" : "text-black hover:text-orange-600"
                        }`}
                      >
                        Men
                      </button>
                      <ul className="mt-2 pl-3 space-y-2 border-l border-gray-100">
                        {menCategories.map((cat) => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                updateFilter("gender", "men");
                                updateFilter("category", cat.name);
                              }}
                              className={`text-sm transition text-left w-full cursor-pointer ${
                                selectedGender === "men" && selectedCategory === cat.name
                                  ? "text-orange-600 font-semibold"
                                  : "text-gray-500 hover:text-black"
                              }`}
                            >
                              {cat.name} ({cat.count})
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* PRICE SECTION */}
              <div className="py-4 border-b border-gray-100">
                <button
                  onClick={() => toggleSection("price")}
                  className="flex w-full items-center justify-between font-bold text-black hover:opacity-75 cursor-pointer"
                >
                  Price
                  {openSections.price ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openSections.price && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={maxPrice}
                      onChange={(e) => updateFilter("maxPrice", e.target.value)}
                      className="range range-orange range-sm w-full accent-orange-600"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Price: ${minPrice} — ${maxPrice}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* COLOR SECTION */}
              <div className="py-4 border-b border-gray-100">
                <button
                  onClick={() => toggleSection("color")}
                  className="flex w-full items-center justify-between font-bold text-black hover:opacity-75 cursor-pointer"
                >
                  Color
                  {openSections.color ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openSections.color && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["beige", "black", "blue", "white", "red", "green", "cream", "olive"].map((c) => (
                      <button
                        key={c}
                        onClick={() => updateFilter("color", selectedColor === c ? "" : c)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition border cursor-pointer ${
                          selectedColor === c
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SIZE SECTION */}
              <div className="py-4 border-b border-gray-100">
                <button
                  onClick={() => toggleSection("size")}
                  className="flex w-full items-center justify-between font-bold text-black hover:opacity-75 cursor-pointer"
                >
                  Size
                  {openSections.size ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openSections.size && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["S", "M", "L", "XL"].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => updateFilter("size", selectedSize === sz ? "" : sz)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-xs font-bold transition cursor-pointer ${
                          selectedSize === sz
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TAGS SECTION */}
              <div className="py-4">
                <button
                  onClick={() => toggleSection("tags")}
                  className="flex w-full items-center justify-between font-bold text-black hover:opacity-75 cursor-pointer"
                >
                  Tags
                  {openSections.tags ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openSections.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["product", "woocommerce", "home_1", "home-accordio-1"].map((t) => (
                      <button
                        key={t}
                        onClick={() => updateFilter("tag", selectedTag === t ? "" : t)}
                        className={`rounded px-3 py-1 text-xs border transition cursor-pointer ${
                          selectedTag === t
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ================= PRODUCTS DISPLAY AREA ================= */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* GRID CONTROLS / SORTING HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="btn btn-outline btn-sm lg:hidden border-gray-200 text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <FiSliders size={14} />
                  Filters
                </button>
                <p className="text-sm font-medium text-gray-500">
                  Showing all <span className="font-bold text-black">{sortedProducts.length}</span> results
                </p>
              </div>

              {/* Sorting & Layout Toggles */}
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                {/* Sorting */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                    className="select select-bordered select-sm border-gray-200 text-sm font-semibold focus:outline-none focus:border-orange-500 rounded-lg text-black bg-white"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name</option>
                  </select>
                </div>

                {/* Columns layout toggle */}
                <div className="hidden sm:flex items-center gap-1 border-l border-gray-100 pl-4">
                  <button
                    onClick={() => setCols(3)}
                    className={`btn btn-square btn-sm border-none cursor-pointer ${cols === 3 ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-400"}`}
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setCols(4)}
                    className={`btn btn-square btn-sm border-none cursor-pointer ${cols === 4 ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-400"}`}
                  >
                    <span className="text-xs font-bold">4x4</span>
                  </button>
                  <button
                    onClick={() => setCols(1)}
                    className={`btn btn-square btn-sm border-none cursor-pointer ${cols === 1 ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-400"}`}
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIVE FILTERS BADGES */}
            {activeFiltersList.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">Active filters:</span>
                {activeFiltersList.map((item) => (
                  <span
                    key={item.key}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3.5 py-1.5 text-xs font-semibold text-black shadow-sm"
                  >
                    {item.label}
                    <button
                      onClick={() => removeFilterTag(item)}
                      className="rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-black transition cursor-pointer"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-orange-600 hover:underline transition ml-2 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}

            {/* ================= PRODUCTS GRID ================= */}
            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="loading loading-spinner loading-lg text-orange-600"></span>
              </div>
            ) : isError ? (
              <div className="alert alert-error max-w-md mx-auto text-white">
                Failed to load products. Please check the JSON server.
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
                <div className="rounded-full bg-orange-50 p-6 text-orange-600 mb-4">
                  <FiSliders size={36} />
                </div>
                <h4 className="text-xl font-bold text-black mb-2">No matching products</h4>
                <p className="text-gray-500 max-w-sm mb-6">
                  We couldn't find any products that match your current filter selections. Try clearing some filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn bg-orange-600 border-none hover:bg-orange-700 text-white rounded-full px-6 py-2.5 shadow-md font-semibold transition cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  cols === 1
                    ? "grid-cols-1"
                    : cols === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition duration-300 hover:shadow-md ${
                      cols === 1 ? "flex flex-col sm:flex-row gap-6 p-4" : "flex flex-col"
                    }`}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative overflow-hidden bg-gray-50 ${
                        cols === 1 ? "h-48 w-full sm:h-52 sm:w-52 rounded-xl" : "aspect-[0.75] w-full"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Sale Badge */}
                      {product.sale && (
                        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                          Sale!
                        </span>
                      )}

                      {/* Quick Actions (Hover overlay) */}
                      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggleWishlist(product));
                          }}
                          className={`flex h-9 w-9 items-center justify-center rounded-full border shadow transition cursor-pointer ${
                            wishlistItems.some((item) => item.id === product.id)
                              ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                              : "border-gray-100 bg-white text-black hover:bg-black hover:text-white"
                          }`}
                          title="Wishlist"
                        >
                          {wishlistItems.some((item) => item.id === product.id) ? (
                            <FaHeart size={14} className="text-red-500" />
                          ) : (
                            <FaRegHeart size={14} />
                          )}
                        </button>
                      </div>

                      {/* Add to Cart Overlay */}
                      {cols !== 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(product));
                            setAddedProductId(product.id);
                            setTimeout(() => setAddedProductId(null), 1500);
                          }}
                          className={`absolute bottom-3 left-3 right-3 h-11 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-1.5 ${
                            addedProductId === product.id
                              ? "bg-green-600 text-white opacity-100"
                              : "bg-black/90 hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {addedProductId === product.id ? (
                            <>
                              <FiCheck size={14} /> Added!
                            </>
                          ) : (
                            "Add To Cart"
                          )}
                        </button>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div className="space-y-2">
                        {/* Gender / Category tag */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                            {product.gender}
                          </span>
                          <span className="text-gray-300 text-[10px]">•</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {product.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold text-black group-hover:text-orange-600 transition line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating / Meta if list view */}
                        {cols === 1 && (
                          <div className="text-xs text-gray-500 space-y-1">
                            <p><strong>Color:</strong> {product.color.charAt(0).toUpperCase() + product.color.slice(1)}</p>
                            <p><strong>Size:</strong> {product.size}</p>
                            <p><strong>Tags:</strong> {product.tags?.join(", ")}</p>
                          </div>
                        )}
                      </div>

                      {/* Price & Action button */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-extrabold text-black">
                            ${product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs font-semibold text-gray-400 line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>

                        {cols === 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              dispatch(addToCart(product));
                              setAddedProductId(product.id);
                              setTimeout(() => setAddedProductId(null), 1500);
                            }}
                            className={`btn btn-sm rounded-xl font-bold uppercase text-[11px] py-1.5 px-4 shadow cursor-pointer ${
                              addedProductId === product.id
                                ? "bg-green-600 text-white"
                                : "btn-black bg-black text-white hover:bg-orange-600"
                            }`}
                          >
                            {addedProductId === product.id ? "Added!" : "Add To Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[10000] lg:hidden flex">
          {/* Overlay background */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Drawer content */}
          <aside className="relative flex w-full max-w-xs flex-col bg-white h-full overflow-y-auto p-6 shadow-2xl transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-lg font-bold text-black flex items-center gap-2">
                <FiSliders size={18} className="text-orange-600" />
                Filters
              </h3>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black transition cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Active Filters inside Drawer */}
            {activeFiltersList.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-4">
                {activeFiltersList.map((item) => (
                  <span
                    key={item.key}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-black"
                  >
                    {item.label}
                    <button
                      onClick={() => removeFilterTag(item)}
                      className="text-gray-400 hover:text-black cursor-pointer"
                    >
                      <FiX size={10} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-orange-600 hover:underline transition ml-1 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}

            {/* CATEGORIES SECTION */}
            <div className="py-3 border-b border-gray-100">
              <h4 className="font-bold text-black mb-3">Categories</h4>
              <div className="space-y-4">
                <div>
                  <button
                    onClick={() => updateFilter("gender", "women")}
                    className={`text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                      selectedGender === "women" ? "text-orange-600" : "text-black"
                    }`}
                  >
                    Women
                  </button>
                  <ul className="mt-2 pl-3 space-y-2 border-l border-gray-100">
                    {womenCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => {
                            updateFilter("gender", "women");
                            updateFilter("category", cat.name);
                            setMobileSidebarOpen(false);
                          }}
                          className={`text-xs transition text-left w-full cursor-pointer ${
                            selectedGender === "women" && selectedCategory === cat.name
                              ? "text-orange-600 font-semibold"
                              : "text-gray-500"
                          }`}
                        >
                          {cat.name} ({cat.count})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => updateFilter("gender", "men")}
                    className={`text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                      selectedGender === "men" ? "text-orange-600" : "text-black"
                    }`}
                  >
                    Men
                  </button>
                  <ul className="mt-2 pl-3 space-y-2 border-l border-gray-100">
                    {menCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => {
                            updateFilter("gender", "men");
                            updateFilter("category", cat.name);
                            setMobileSidebarOpen(false);
                          }}
                          className={`text-xs transition text-left w-full cursor-pointer ${
                            selectedGender === "men" && selectedCategory === cat.name
                              ? "text-orange-600 font-semibold"
                              : "text-gray-500"
                          }`}
                        >
                          {cat.name} ({cat.count})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PRICE SECTION */}
            <div className="py-4 border-b border-gray-100">
              <h4 className="font-bold text-black mb-3">Price Range</h4>
              <input
                type="range"
                min="10"
                max="200"
                value={maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="range range-orange range-sm w-full accent-orange-600"
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>Price: ${minPrice} — ${maxPrice}</span>
              </div>
            </div>

            {/* COLOR SECTION */}
            <div className="py-4 border-b border-gray-100">
              <h4 className="font-bold text-black mb-3">Color</h4>
              <div className="flex flex-wrap gap-1.5">
                {["beige", "black", "blue", "white", "red", "green", "cream", "olive"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      updateFilter("color", selectedColor === c ? "" : c);
                      setMobileSidebarOpen(false);
                    }}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition border cursor-pointer ${
                      selectedColor === c
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SECTION */}
            <div className="py-4 border-b border-gray-100">
              <h4 className="font-bold text-black mb-3">Size</h4>
              <div className="flex flex-wrap gap-1.5">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      updateFilter("size", selectedSize === sz ? "" : sz);
                      setMobileSidebarOpen(false);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition cursor-pointer ${
                      selectedSize === sz
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* TAGS SECTION */}
            <div className="py-4">
              <h4 className="font-bold text-black mb-3">Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {["product", "woocommerce", "home_1", "home-accordio-1"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      updateFilter("tag", selectedTag === t ? "" : t);
                      setMobileSidebarOpen(false);
                    }}
                    className={`rounded px-2 py-0.5 text-xs border transition cursor-pointer ${
                      selectedTag === t
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-500 border-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Shop;