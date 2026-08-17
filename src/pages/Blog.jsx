import React, { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

import { useGetStyleGuidesQuery } from "../services/styleGuideApi";

function Blog() {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetStyleGuidesQuery();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "Fashion",
    "Inspirations",
    "Life Style",
    "Trends",
  ];

  // =========================================
  // FILTER POSTS
  // =========================================

  const filteredPosts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesSearch =
        post.title
          ?.toLowerCase()
          .includes(searchText) ||
        post.description
          ?.toLowerCase()
          .includes(searchText) ||
        post.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, selectedCategory]);

  // =========================================
  // LOADING
  // =========================================

  if (isLoading) {
    return (
      <section className="min-h-screen bg-white px-5 pt-32">
        <div className="flex min-h-[500px] items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </section>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (isError) {
    return (
      <section className="min-h-screen bg-white px-5 pt-32">
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-lg font-medium text-red-500">
            Failed to load blog posts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-5 pb-20 pt-32 md:px-10 lg:px-16 xl:px-20">

      <div className="mx-auto max-w-[1650px]">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[390px_1fr] xl:grid-cols-[420px_1fr]">

          {/* =====================================
              SIDEBAR
          ===================================== */}

          <aside className="lg:pr-8">

            {/* SEARCH */}

            <div className="relative">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search ..."
                className="
                  h-14
                  w-full
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  px-6
                  pr-14
                  text-black
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-black
                "
              />

              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-black
                  "
                >
                  <FiX size={22} />
                </button>
              ) : (
                <FiSearch
                  size={22}
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />
              )}

            </div>

            {/* SEARCH COUNT */}

            {search && (
              <p className="mt-3 text-sm text-gray-500">
                {filteredPosts.length} posts found
              </p>
            )}

            {/* =====================================
                CATEGORIES
            ===================================== */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold text-black">
                Categories
              </h2>

              <div className="mt-6 space-y-5">

                {/* ALL */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                  className={`
                    block
                    text-left
                    text-lg
                    transition
                    ${
                      selectedCategory === "All"
                        ? "font-semibold text-black"
                        : "text-gray-500 hover:text-black"
                    }
                  `}
                >
                  All
                </button>

                {/* CATEGORY */}

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`
                      block
                      text-left
                      text-lg
                      transition
                      ${
                        selectedCategory === category
                          ? "font-semibold text-black"
                          : "text-gray-500 hover:text-black"
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}

              </div>

            </div>

            {/* =====================================
                ARCHIVES
            ===================================== */}

            <div className="mt-12">

              <h2 className="text-2xl font-semibold text-black">
                Archives
              </h2>

              <select
                defaultValue=""
                className="
                  mt-6
                  h-20
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-5
                  text-lg
                  text-gray-700
                  outline-none
                  focus:border-black
                "
              >
                <option value="" disabled>
                  Select Month
                </option>

                <option value="august">
                  August 2026
                </option>

                <option value="july">
                  July 2026
                </option>

                <option value="june">
                  June 2026
                </option>
              </select>

            </div>

            {/* =====================================
                CALENDAR
            ===================================== */}

            <div className="mt-10">

              <p className="mb-5 text-center text-sm uppercase tracking-[0.35em] text-gray-500">
                August 2026
              </p>

              <div className="grid grid-cols-7 text-center text-sm">

                {[
                  "M",
                  "T",
                  "W",
                  "T",
                  "F",
                  "S",
                  "S",
                ].map((day, index) => (
                  <div
                    key={index}
                    className="
                      border
                      border-gray-200
                      bg-gray-100
                      py-3
                      font-semibold
                    "
                  >
                    {day}
                  </div>
                ))}

                {/* AUGUST 2026 STARTS SATURDAY */}

                {Array.from(
                  { length: 5 },
                  (_, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 py-4"
                    />
                  )
                )}

                {Array.from(
                  { length: 31 },
                  (_, index) => (
                    <div
                      key={index}
                      className="
                        border
                        border-gray-100
                        py-4
                        text-gray-500
                        hover:bg-gray-100
                      "
                    >
                      {index + 1}
                    </div>
                  )
                )}

              </div>

            </div>

          </aside>

          {/* =====================================
              BLOG CONTENT
          ===================================== */}

          <main>

            {/* =================================
                HERO
            ================================= */}

            <div
              className="
                relative
                h-[320px]
                overflow-hidden
                rounded-[25px]
                md:h-[370px]
              "
            >

              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1800&auto=format&fit=crop"
                alt="Blog"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">

                <h1 className="text-5xl font-bold text-white md:text-6xl">
                  Blog
                </h1>

                <p className="mt-4 text-lg text-white">
                  Home / Blog
                </p>

              </div>

            </div>

            {/* =================================
                ACTIVE FILTER
            ================================= */}

            {(search || selectedCategory !== "All") && (
              <div className="mt-8 flex flex-wrap items-center gap-3">

                <span className="text-sm text-gray-500">
                  Showing:
                </span>

                {selectedCategory !== "All" && (
                  <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                    {selectedCategory}
                  </span>
                )}

                {search && (
                  <span className="rounded-full bg-orange-600 px-4 py-2 text-sm text-white">
                    "{search}"
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="text-sm font-semibold underline"
                >
                  Clear
                </button>

              </div>
            )}

            {/* =================================
                BLOG CARDS
            ================================= */}

            {filteredPosts.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">

                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="
                      group
                      relative
                      h-[375px]
                      overflow-hidden
                      rounded-[18px]
                    "
                  >

                    {/* IMAGE */}

                    <img
                      src={post.image}
                      alt={post.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/30" />

                    {/* CATEGORY */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          post.category
                        )
                      }
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-black/50
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        backdrop-blur-sm
                        transition
                        hover:bg-orange-600
                      "
                    >
                      {post.category}
                    </button>

                    {/* BADGE */}

                    <span
                      className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        bg-white/80
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-black
                        backdrop-blur-sm
                      "
                    >
                      {post.badge}
                    </span>

                    {/* CONTENT */}

                    <div className="absolute bottom-0 left-0 right-0 p-6">

                      <h2 className="text-2xl font-bold text-white">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-white/90">
                        {post.description}
                      </p>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-gray-200 py-20 text-center">

                <FiSearch
                  size={35}
                  className="mx-auto text-gray-400"
                />

                <h2 className="mt-5 text-2xl font-bold">
                  No posts found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try another search or category.
                </p>

              </div>
            )}

          </main>

        </div>
      </div>

    </section>
  );
}

export default Blog;