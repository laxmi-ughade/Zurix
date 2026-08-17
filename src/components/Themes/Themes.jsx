import React from "react";

const themes = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=200&auto=format&fit=crop",
    title: "Check shirt with pocket",
    price: "$29.99",
    position: "large-left",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop",
    title: "Rustic linen blend shirt",
    price: "$39.99",
    position: "large-middle",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=200&auto=format&fit=crop",
    title: "Check shirt with pocket",
    price: "$29.99",
    position: "large-right",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200&auto=format&fit=crop",
    title: "Relaxed fit shirt",
    price: "$34.99",
    position: "bottom-left",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=200&auto=format&fit=crop",
    title: "Modern casual look",
    price: "$49.99",
    position: "bottom-middle",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=900&auto=format&fit=crop",
    productImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop",
    title: "Classic summer outfit",
    price: "$44.99",
    position: "bottom-right",
  },
];

function ProductOverlay({ theme }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-2xl border border-white/50 bg-white/30 p-3 backdrop-blur-md">
      
      <div className="flex items-center gap-3">
        <img
          src={theme.productImage}
          alt={theme.title}
          className="h-12 w-12 rounded-xl object-cover"
        />

        <div>
          <h3 className="text-sm font-bold text-white">
            {theme.title}
          </h3>

          <p className="mt-1 text-xs font-semibold text-white">
            {theme.price}
          </p>
        </div>
      </div>

      <button className="btn rounded-full border-none bg-orange-600 px-5 text-white hover:bg-orange-700">
        Shop now
      </button>
    </div>
  );
}

function Themes() {
  return (

    <section className="bg-white px-4 py-10 md:px-10 lg:px-20">

    <div>
        <h1 className = "text-orange-600 font-semibold">SS26 - PALETTE EDIT</h1>
        <p className="mt-1 text-[45px] text-black font-bold">
          Discover our latest collection.
        </p>
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* LEFT COLUMN */}
        <div className="space-y-5">

          {/* Large card */}
          <div className="relative h-[600px] overflow-hidden rounded-[25px]">
            <img
              src={themes[0].image}
              alt={themes[0].title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />

            <ProductOverlay theme={themes[0]} />
          </div>

          {/* Bottom card */}
          <div className="relative h-[350px] overflow-hidden rounded-[25px]">
            <img
              src={themes[3].image}
              alt={themes[3].title}
              className="h-full w-full object-cover"
            />

            <ProductOverlay theme={themes[3]} />
          </div>

        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-5">

          <div className="relative h-[705px] overflow-hidden rounded-[25px]">
            <img
              src={themes[1].image}
              alt={themes[1].title}
              className="h-full w-full object-cover"
            />

            <ProductOverlay theme={themes[1]} />
          </div>

          <div className="relative h-[350px] overflow-hidden rounded-[25px]">
            <img
              src={themes[4].image}
              alt={themes[4].title}
              className="h-full w-full object-cover"
            />

            <ProductOverlay theme={themes[4]} />
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">

          <div className="relative h-[600px] overflow-hidden rounded-[25px]">
            <img
              src={themes[2].image}
              alt={themes[2].title}
              className="h-full w-full object-cover"
            />

            <ProductOverlay theme={themes[2]} />
          </div>

          <div className="relative h-[350px] overflow-hidden rounded-[25px]">
            <img
              src={themes[5].image}
              alt={themes[5].title}
              className="h-full w-full object-cover"
            />

            <ProductOverlay theme={themes[5]} />
          </div>

        </div>

      </div>

    

    </section>
  );
}

export default Themes;