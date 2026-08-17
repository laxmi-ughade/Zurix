import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryApi";

function Categories() {
  const [activeCategory, setActiveCategory] = useState("women");

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetCategoriesQuery(activeCategory);

  return (
    <section className="bg-white px-6 py-15 md:px-12 lg:px-20">

      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Browse
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
            Explore Categories
          </h2>
        </div>

        {/* Women / Men */}
        <div className="flex gap-3">

          {/* Women */}
          <button
            onClick={() => setActiveCategory("women")}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeCategory === "women"
                ? "bg-black text-white"
                : "border border-gray-200 bg-white text-black hover:bg-gray-100"
            }`}
          >
            Women
            <span
              className={`ml-2 rounded-full px-2 py-1 text-xs ${
                activeCategory === "women"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              24
            </span>
          </button>

          {/* Men */}
          <button
            onClick={() => setActiveCategory("men")}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeCategory === "men"
                ? "bg-black text-white"
                : "border border-gray-200 bg-white text-black hover:bg-gray-100"
            }`}
          >
            Men
            <span
              className={`ml-2 rounded-full px-2 py-1 text-xs ${
                activeCategory === "men"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              32
            </span>
          </button>

        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-orange-600"></span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="alert alert-error max-w-md">
            <span>Failed to load categories.</span>
          </div>
        </div>
      )}

      {/* Cards */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">

          {categories.map((category) => (
            <Link
              to={`/shop?gender=${activeCategory}&category=${encodeURIComponent(category.name)}`}
              key={category.id}
              className="group cursor-pointer block"
            >

              {/* Image */}
              <div className="relative aspect-[0.78] overflow-hidden rounded-2xl bg-gray-100">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Count */}
                <div className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-semibold text-black shadow">
                  {category.count}
                </div>

              </div>

              {/* Name */}
              <p className="mt-4 text-center text-[16px] font-medium text-black">
                {category.name}
              </p>

            </Link>
          ))}

        </div>
      )}

    </section>
  );
}

export default Categories;