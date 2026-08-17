import React from "react";
import { FaArrowRight } from "react-icons/fa";

function OfferSection() {
  return (
    <section className="w-full bg-white px-4 py-8 md:py-12 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">

        {/* ================= LEFT IMAGE ================= */}
        <div className="relative h-72 sm:h-96 md:min-h-[570px] overflow-hidden rounded-lg md:rounded-[24px] bg-gray-200">

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80"
            alt="Paris Milan Collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* ================= PRODUCT CARD 1 ================= */}
          <div className="absolute left-3 sm:left-6 md:left-8 top-3 sm:top-6 md:top-8 rotate-[-4deg] rounded-lg md:rounded-xl bg-white p-1 md:p-2 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=300&q=80"
              alt="Shirt"
              className="h-28 w-24 sm:h-36 sm:w-28 md:h-48 md:w-36 rounded-lg object-cover"
            />
          </div>

          {/* ================= PRODUCT CARD 2 ================= */}
          <div className="hidden sm:block absolute right-3 md:right-7 top-3 md:top-7 rotate-[4deg] rounded-lg md:rounded-xl bg-white p-1 md:p-2 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=300&q=80"
              alt="Jacket"
              className="h-32 w-28 md:h-40 md:w-32 rounded-lg object-cover"
            />
          </div>

          {/* ================= PRODUCT CARD 3 ================= */}
          <div className="hidden sm:block absolute bottom-12 sm:bottom-16 md:bottom-20 right-3 md:right-7 rotate-[-3deg] rounded-lg md:rounded-xl bg-white p-1 md:p-2 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80"
              alt="Clothing"
              className="h-32 w-28 md:h-40 md:w-32 rounded-lg object-cover"
            />
          </div>

          {/* ================= BOTTOM TEXT ================= */}
          <div className="absolute bottom-3 sm:bottom-5 md:bottom-7 left-3 sm:left-6 md:left-8 text-white">

            <p className="mb-1 md:mb-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
              SS26 Collection
            </p>

            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Paris & Milan
            </h2>

          </div>

          {/* SALE LIVE */}
          <div className="absolute bottom-3 sm:bottom-5 md:bottom-7 right-3 sm:right-6 md:right-7">
            <button className="btn btn-sm md:btn-md rounded-full border-none bg-orange-600 px-4 md:px-6 text-xs md:text-sm text-white hover:bg-orange-700">
              SALE LIVE
            </button>
          </div>

        </div>

        {/* ================= RIGHT OFFER ================= */}
        <div className="flex min-h-72 sm:min-h-96 md:min-h-[570px] flex-col justify-center rounded-lg md:rounded-[24px] bg-[#f3f0eb] px-5 sm:px-8 md:px-14 lg:px-16 py-8 md:py-12">

          {/* Small Heading */}
          <div className="mb-5 md:mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>

            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-gray-600">
              Limited Time Offer
            </p>
          </div>

          {/* Sale Text */}
          <p className="mb-1 md:mb-2 text-base md:text-lg text-gray-600">
            Sale up to
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-black">
            20% Off{" "}
            <span className="text-orange-600">
              All Items
            </span>
          </h2>

          {/* Divider */}
          <div className="my-5 md:my-8 h-px w-full bg-gray-300"></div>

          {/* ================= COUNTDOWN ================= */}
          <div className="mb-6 md:mb-8 grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-sm">

            {/* DAYS */}
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-full bg-black text-white p-1">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                314
              </span>

              <span className="text-[7px] sm:text-[9px] uppercase tracking-widest">
                Days
              </span>
            </div>

            {/* HOURS */}
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-full bg-white text-black p-1 shadow-sm">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                22
              </span>

              <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-gray-500">
                Hours
              </span>
            </div>

            {/* MINUTES */}
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-full bg-white text-black p-1 shadow-sm">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                31
              </span>

              <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-gray-500">
                Mins
              </span>
            </div>

            {/* SECONDS */}
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-full bg-white text-black p-1 shadow-sm">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                00
              </span>

              <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-gray-500">
                Secs
              </span>
            </div>

          </div>


          {/* Description */}
          <p className="mb-6 md:mb-8 max-w-2xl text-xs md:text-base leading-6 md:leading-7 text-gray-500">
            Save extra on our exclusive sale collection.
            Selected styles — while stocks last.
          </p>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-5">

            {/* SHOP SALE */}
            <button className="btn btn-sm md:btn-md h-10 md:h-14 rounded-full border-none bg-black px-5 md:px-7 text-xs md:text-base font-semibold text-white hover:bg-gray-800 w-full sm:w-auto">

              Shop The Sale

              <span className="ml-2 md:ml-3 flex h-7 md:h-9 w-7 md:w-9 items-center justify-center rounded-full bg-gray-700">
                <FaArrowRight size={12} className="md:block" />
              </span>

            </button>

            {/* VIEW DEALS */}
            <button className="border-b-2 border-black pb-1 text-xs md:text-sm font-semibold text-black">
              View all deals
            </button>

          </div>

        </div>

      </div>

  
      {/* ================= CHAT BUTTON ================= */}

      <button className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition">
        <span className="text-xl sm:text-2xl">
          💬
        </span>
      </button>

    </section>
  );
}

export default OfferSection;