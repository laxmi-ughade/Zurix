import { Link } from "react-router-dom";

function NavbarLogo({ scrolled }) {
  return (
    <Link
      to="/"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
    >
      <img
        src="/images/logo.svg"
        alt="ZURIX"
        className={`
          w-20 md:w-28 lg:w-32
          h-auto
          transition-all
          duration-500
          

          ${
            scrolled
              ? "brightness-100"
              : "brightness-0 invert"
          }
        `}
      />
    </Link>
  );
}

export default NavbarLogo;