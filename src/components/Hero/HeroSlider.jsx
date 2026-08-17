import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/images/slider1.png",
    tag: "NEW ARRIVALS — ATELIER EDIT",
    title: ["Quietly", "Refined"],
    buttonColor: "bg-[#d05621] hover:bg-[#C1481A]",
    accent: "bg-[#e8c4b5]",
  },
  {
    id: 2,
    image: "/images/slider2.png",
    tag: "SS26 COLLECTION — PARIS & MILAN",
    title: ["Dressed", "in Light"],
    buttonColor: "bg-orange-600 hover:bg-white hover:text-black",
    accent: "bg-white/80",
  },
];

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] w-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-full h-full">
              <img
                src={slide.image}
                alt={slide.tag}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="absolute left-[5%] md:left-[7%] top-[25%] md:top-[30%] z-10 text-white max-w-[85%] md:max-w-[60%]">
                <p className="mb-2 md:mb-3 text-xs sm:text-sm font-medium tracking-wide md:text-base lg:text-[18px]">
                  {slide.tag}
                </p>

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[72px] font-bold leading-tight md:leading-[0.95]">
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </h1>

                <Link
                  to="/shop"
                  className={`mt-4 md:mt-6 lg:mt-10 inline-flex items-center justify-center h-10 md:h-12 lg:h-14 rounded-full border-none px-5 md:px-6 lg:px-8 text-xs sm:text-sm md:text-base font-semibold text-white transition duration-300 shadow-lg hover:scale-105 active:scale-95 ${slide.buttonColor}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Discover Now</span>
                    <span>→</span>
                  </span>
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Hidden on small mobile */}
        <div className="absolute left-3 right-3 md:left-5 md:right-5 top-1/2 z-20 flex -translate-y-1/2 justify-between">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={showPrevious}
            className="hidden sm:flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border-none bg-white text-lg text-black shadow-md hover:bg-white/90 transition"
          >
            ❮
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={showNext}
            className="hidden sm:flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border-none bg-white text-lg text-black shadow-md hover:bg-white/90 transition"
          >
            ❯
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition-all ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;