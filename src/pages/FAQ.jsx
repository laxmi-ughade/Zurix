import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronDown, FiHelpCircle } from "react-icons/fi";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I track my order?",
      a: "You can track your order at any time using our Order Tracking page. Simply enter your Order ID (e.g. ZUX-123456) or your account email to view real-time shipment updates.",
    },
    {
      q: "What is your return & refund policy?",
      a: "We offer a 30-day hassle-free return guarantee on all unworn, unwashed items with tags intact. Refunds are processed to your original payment method within 3-5 business days.",
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days and is FREE on all orders over $75. Priority Express delivery takes 1-2 business days for a flat fee of $15.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Visa, Mastercard, American Express, PayPal, Cash on Delivery (COD), and UPI / QR code payments.",
    },
    {
      q: "How can I apply a discount or promo code?",
      a: "You can enter your promo code (e.g. WELCOME10) directly on the Shopping Cart page or during checkout in the Order Summary section.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">Frequently Asked Questions</span>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <FiHelpCircle size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Find answers to common questions about orders, payments, shipping, and returns.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-sm transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-neutral-900 pr-4">
                  {faq.q}
                </span>
                <FiChevronDown
                  size={18}
                  className={`shrink-0 text-neutral-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-orange-600" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-neutral-100 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-neutral-600 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;