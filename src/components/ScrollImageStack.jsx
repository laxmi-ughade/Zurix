import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useGetScrollCollectionsQuery } from "../services/categoryApi";

function ScrollImageStack() {
  const {
    data: collections = [],
    isLoading,
    isError,
  } = useGetScrollCollectionsQuery();

  if (isLoading) {
    return (
      <section className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-10 py-20">
        <div className="alert alert-error">
          Failed to load collections.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">

      {/* =========================
          SCROLL SECTION
      ========================= */}

      <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-12">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* ==================================
              LEFT SIDE - IMAGE STACK
          ================================== */}

          <div className="relative">

            {/* Height controls how long
                the scrolling animation lasts */}
            <div
              className="relative"
              style={{
                height: `${collections.length * 100}vh`,
              }}
            >

              {collections.map((item, index) => (

                <div
                  key={item.id}
                  className="sticky top-24 flex h-[calc(100vh-120px)] items-center justify-center"
                  style={{
                    zIndex: index + 1,
                  }}
                >

                  {/* IMAGE CARD */}

                  <div
                    className="group relative h-[580px] w-full max-w-[520px] overflow-hidden rounded-[24px] bg-gray-100 shadow-xl"
                    style={{
                      transform: `translateY(${index * 12}px)`,
                    }}
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* DARK GRADIENT */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>


                    {/* CONTENT ON IMAGE */}

                    <div className="absolute bottom-8 left-8 right-8 text-white">

                      <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-wider backdrop-blur-md">
                        {item.tag}
                      </span>

                      <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                        {item.title}
                      </h3>


                      <button className="mt-5 flex items-center gap-3 rounded-full bg-orange-600 px-6 py-3 font-semibold transition hover:bg-orange-500">

                        {item.button}

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                          <FaArrowRight size={12} />
                        </span>

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ==================================
              RIGHT SIDE - TEXT
          ================================== */}

          <div className="flex items-center">

            <div className="sticky top-32 max-w-[650px]">

              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                New Season
              </p>

              <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl">

                Dress well,
                <br />

                feel great,
                <br />

                every single day.

              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

                Discover our newest arrivals — effortless pieces
                designed to keep you looking and feeling your best,
                from morning to night.

              </p>


              <button className="mt-8 flex items-center gap-4 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-orange-600">

                Shop all collection

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700">

                  <FaArrowRight size={13} />

                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ScrollImageStack;