import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useGetTestimonialsQuery } from "../services/categoryApi";

function Testimonials() {
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useGetTestimonialsQuery();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slider
  useEffect(() => {
    if (testimonials.length <= 5) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= testimonials.length - 5) {
          return 0;
        }

        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section className="flex h-[500px] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center text-red-500">
        Failed to load testimonials.
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#f8f6f3] px-6 py-20 md:px-10 lg:px-16">

      {/* HEADER */}

      <div className="mb-14 text-center">

        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
          Testimonials
        </p>

        <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
          Over 500 Happy Reviews
        </h2>

      </div>


      {/* SLIDER */}

      <div className="overflow-hidden">

        <div
          className="flex gap-8 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 20.5}%)`,
          }}
        >

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.id}
              className="
                min-w-full
                overflow-hidden
                rounded-[20px]
                bg-white
                shadow-sm

                sm:min-w-[calc(50%-16px)]

                lg:min-w-[calc(20%-26px)]
              "
            >

              {/* IMAGE */}

              <div className="h-[260px] overflow-hidden">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>


              {/* CONTENT */}

              <div className="p-6">

                {/* STARS */}

                <div className="mb-4 flex gap-1 text-yellow-400">

                  {[...Array(testimonial.rating)].map((_, index) => (
                    <FaStar key={index} size={17} />
                  ))}

                </div>


                {/* REVIEW */}

                <p className="min-h-[100px] text-base leading-7 text-gray-600">
                  {testimonial.review}
                </p>


                {/* USER */}

                <div className="mt-5 flex items-center gap-3">

                  {/* Small avatar */}
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  <div>

                    <p className="text-sm font-bold text-gray-700">
                      @{testimonial.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {testimonial.location}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* DOTS */}

      {testimonials.length > 5 && (
        <div className="mt-10 flex justify-center gap-2">

          {testimonials.slice(0, testimonials.length - 4).map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-black"
                  : "w-2 bg-gray-300"
              }`}
            />

          ))}

        </div>
      )}

    </section>
  );
}

export default Testimonials;