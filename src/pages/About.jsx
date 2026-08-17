import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiCheckCircle, FiShield, FiHeart, FiGlobe, FiAward } from "react-icons/fi";

function About() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <FiChevronRight size={14} className="text-neutral-400" />
          <span className="font-semibold text-black">About Us</span>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-16 sm:px-12 md:py-24 text-center text-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-orange-950/80"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block rounded-full bg-orange-600/30 border border-orange-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-400">
              Our Journey & Ethos
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Redefining Modern Fashion with Zurix
            </h1>
            <p className="text-sm sm:text-base text-neutral-300">
              Crafting conscious, timeless collections designed to elevate your everyday silhouette without compromising on sustainability.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <FiAward size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Unrivaled Quality</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-500">
              Every garment is rigorously tested for durability, premium comfort, and flawless tailoring.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <FiGlobe size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Sustainable Sourcing</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-500">
              Committed to zero-waste packaging, organic cotton, and ethically certified partner factories.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <FiHeart size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Customer Centric</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-500">
              Seamless shopping experience with 24/7 dedicated assistance and guaranteed satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;