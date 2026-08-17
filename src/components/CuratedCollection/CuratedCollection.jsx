import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CuratedCollections() {
  const images = [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-white px-4 py-12 sm:px-6 md:px-10 lg:px-16 md:py-20">
      {/* Section Heading */}
      <div className="mb-10 sm:mb-16 text-center">
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
          Curated Collections
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
          Outfit for every moment
        </h2>
      </div>

      {/* Collection Card */}
      <div className="relative mx-auto h-[420px] sm:h-[520px] md:h-[620px] max-w-[1650px] overflow-hidden rounded-2xl sm:rounded-[25px]">
        {/* Background Image */}
        <img
          src={images[currentImage]}
          alt="Fashion Collection"
          className="h-full w-full object-cover transition-opacity duration-1000"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Travel Collection
          </p>

          <h3 className="max-w-[600px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] sm:leading-[1.05]">
            Pack Light,
            <br />
            Arrive Elegant
          </h3>

          {/* Discover Button */}
          <Link
            to="/shop"
            className="mt-6 sm:mt-10 flex h-12 sm:h-16 items-center gap-3 rounded-full bg-white pl-6 pr-2 text-xs sm:text-base font-semibold text-black shadow-lg hover:bg-neutral-100 transition"
          >
            <span>Discover Now</span>
            <span className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black text-sm sm:text-xl text-white">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CuratedCollections;