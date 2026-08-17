import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetStyleGuidesQuery } from "../services/categoryApi";

function StyleGuideSlider() {
  const {
    data: styles = [],
    isLoading,
    isError,
  } = useGetStyleGuidesQuery();

  const [currentIndex, setCurrentIndex] = useState(0);

  /*
    Move slider automatically
  */
  useEffect(() => {
    if (styles.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= styles.length - 4) {
          return 0;
        }

        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [styles.length]);

  /*
    Previous button
  */
  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(styles.length - 4, 0);
      }

      return prev - 1;
    });
  };

  /*
    Next button
  */
  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= styles.length - 4) {
        return 0;
      }

      return prev + 1;
    });
  };

  if (isLoading) {
    return (
      <section className="px-6 py-20">
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-6 py-20">
        <p className="text-center text-red-500">
          Failed to load style guides.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-14">

      {/* HEADER */}
 
      <div className="mb-16">

        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
          SS / 26 — EDIT NO. 04
        </p>

        <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
          Dressed for the asphalt.
        </h2>

      </div>


      {/* SLIDER */}

      <div className="relative">

        {/* CARDS CONTAINER */}

        <div className="overflow-hidden">

          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / 4 + 1.5)
              }%)`,
            }}
          >

            {styles.map((item, index) => (

              <div
                key={item.id}
                className="group min-w-[calc(25%-18px)] flex-shrink-0"
              >

                {/* IMAGE */}

                <div className="relative h-[440px] overflow-hidden rounded-[20px] bg-gray-100 md:h-[520px]">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* DARK OVERLAY */}

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10"></div>


                  {/* BADGE */}

                  <span className="absolute left-5 top-5 rounded-full bg-white/70 px-5 py-2 text-xs font-bold text-white backdrop-blur-md">
                    {item.badge}
                  </span>


                  {/* NUMBER */}

                  <span className="absolute bottom-5 right-5 text-sm font-semibold text-white">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(styles.length).padStart(2, "0")}
                  </span>

                </div>


                {/* CARD CONTENT */}

                <div className="pt-5">

                  <h3 className="text-2xl font-bold text-orange-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base text-gray-500">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* NEXT BUTTON */}

        <button
          onClick={handleNext}
          className="absolute right-0 top-[45%] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-black hover:text-white"
        >
          <FaArrowRight />
        </button>


        {/* PREVIOUS BUTTON */}

        <button
          onClick={handlePrevious}
          className="absolute left-0 top-[45%] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-black hover:text-white"
        >
          <FaArrowLeft />
        </button>

      </div>


      

    </section>
  );
}

export default StyleGuideSlider;