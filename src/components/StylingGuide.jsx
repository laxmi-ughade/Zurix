import { useState } from "react";
import { FaHeart, FaRegEye, FaArrowRight } from "react-icons/fa";
import { useGetStylingProductsQuery } from "../services/categoryApi";

function StylingGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetStylingProductsQuery();

  return (
    <section className="bg-white px-5 py-16 md:px-10 lg:px-20">

      {/* ================= HEADER ================= */}
      <div className="mb-14 text-center">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
          Styling Guide
        </p>

        <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
          Build your signature look
        </h2>

        <p className="mt-4 text-lg text-gray-500">
          Layer — Proportion — Detail
        </p>

      </div>


      {/* ================= MAIN BOX ================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

        {/* ================= CLICKABLE TITLE ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-5 bg-gray-50 px-8 py-8 text-left transition hover:bg-gray-100"
        >

          {/* NUMBER */}
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white">
            1
          </span>

          {/* TEXT */}
          <div className="flex-1">

            <p className="mb-2 text-sm uppercase tracking-wider text-gray-500">
              Anchor the silhouette
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Start with a layer
            </h3>

          </div>

          {/* ARROW */}
          <span
            className={`text-2xl transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            →
          </span>

        </button>


        {/* ================= PRODUCTS ================= */}
        {isOpen && (
          <div className="border-t border-gray-200 p-8">

            {isLoading && (
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-orange-600"></span>
              </div>
            )}

            {isError && (
              <div className="alert alert-error">
                Failed to load styling products.
              </div>
            )}

            {!isLoading && !isError && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {products.map((product) => (

                  <div
                    key={product.id}
                    className="group relative"
                  >

                    {/* IMAGE */}
                    <div className="relative h-[430px] overflow-hidden rounded-2xl bg-gray-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* ACTION BUTTONS */}
                      <div className="absolute right-4 top-4 flex flex-col gap-3">

                        <button className="btn btn-circle bg-white text-black shadow-md hover:bg-black hover:text-white">
                          <FaRegEye />
                        </button>

                        <button className="btn btn-circle bg-white text-black shadow-md hover:bg-black hover:text-white">
                          <FaHeart />
                        </button>

                      </div>


                      {/* SHOP NOW */}
                      <button className="absolute bottom-4 left-4 right-4 rounded-full bg-black py-4 font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                        Shop Now
                      </button>

                    </div>


                    {/* PRODUCT INFO */}
                    <div className="mt-4">

                      <h4 className="text-base font-semibold text-black">
                        {product.name}
                      </h4>

                      <p className="mt-1 font-medium text-gray-600">
                        ${product.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>
        )}

      </div>

    </section>
  );
}

export default StylingGuide;