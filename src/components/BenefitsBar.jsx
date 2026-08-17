import React from "react";
import {
  FaTruck,
  FaRegCreditCard,
  FaLifeRing,
  FaCreditCard,
} from "react-icons/fa";

function BenefitsBar() {
  const benefits = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      description: "Free Shipping for orders",
    },
    {
      icon: <FaRegCreditCard />,
      title: "Money Guarantee",
      description: "Within 30 days",
    },
    {
      icon: <FaLifeRing />,
      title: "Online Support",
      description: "24 hours a day, 7 days a week",
    },
    {
      icon: <FaCreditCard />,
      title: "Flexible Payment",
      description: "Pay with Multiple Credit Cards",
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-8 md:py-10 md:px-10 lg:px-16">

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 text-center sm:text-left"
          >

            {/* ICON */}
            <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg md:text-2xl text-gray-800">
              {item.icon}
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-base md:text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-500">
                {item.description}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default BenefitsBar;