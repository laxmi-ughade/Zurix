import { useState } from "react";
import { useSendMessageMutation } from "../services/contactApi";

function Contact() {
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      await sendMessage(formData).unwrap();

      setSuccess("✓ Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white px-6 py-16 md:px-12 lg:px-28">

      {/* ================= HEADER ================= */}
      <div className="mb-16">

        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
          Contact Us
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-black md:text-7xl">
          Say hello.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Real people, in Berlin, answering email Monday to Friday.
          Usually back within the working day.
        </p>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">

        {/* ================= CONTACT FORM ================= */}
        <form onSubmit={handleSubmit}>

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              autoComplete="name"
              className="
                h-20
                rounded-lg
                border
                border-gray-200
                bg-gray-100
                px-6
                text-lg
                text-black
                placeholder:text-gray-500
                outline-none
                transition
                focus:border-orange-500
                focus:bg-white
                focus:ring-2
                focus:ring-orange-200
              "
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              autoComplete="email"
              className="
                h-20
                rounded-lg
                border
                border-gray-200
                bg-gray-100
                px-6
                text-lg
                text-black
                placeholder:text-gray-500
                outline-none
                transition
                focus:border-orange-500
                focus:bg-white
                focus:ring-2
                focus:ring-orange-200
              "
            />

          </div>

          {/* SUBJECT */}
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="
              mt-7
              h-20
              w-full
              rounded-lg
              border
              border-gray-200
              bg-gray-100
              px-6
              text-lg
              text-black
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-orange-500
              focus:bg-white
              focus:ring-2
              focus:ring-orange-200
            "
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message (optional)"
            rows="7"
            className="
              mt-7
              w-full
              resize-none
              rounded-lg
              border
              border-gray-200
              bg-gray-100
              px-6
              py-6
              text-lg
              text-black
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-orange-500
              focus:bg-white
              focus:ring-2
              focus:ring-orange-200
            "
          />

          {/* SEND BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              group
              mt-7
              flex
              items-center
              gap-5
              rounded-full
              bg-black
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-orange-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <span>
              {isLoading ? "Sending..." : "Send Message"}
            </span>

            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-xl
                text-black
                transition
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </button>

          {/* SUCCESS */}
          {success && (
            <p className="mt-5 font-medium text-green-600">
              {success}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="mt-5 font-medium text-red-600">
              {error}
            </p>
          )}

        </form>

        {/* ================= CONTACT INFORMATION ================= */}
        <div className="space-y-12">

          {/* EMAIL */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-500">
              Email
            </p>

            <h3 className="text-2xl font-bold text-black md:text-3xl">
              studio@zurix.co
            </h3>
          </div>

          {/* WORKING HOURS */}
          <div>
            <p className="mb-5 text-sm uppercase tracking-widest text-gray-500">
              Working Hours
            </p>

            <p className="text-lg leading-8 text-gray-700">
              Mon – Fri, 7:30 AM – 4:00 PM CET
              <br />
              Sat, 8:00 AM – 1:00 PM CET
              <br />
              Sun, Closed
            </p>
          </div>

          {/* STUDIO */}
          <div>
            <p className="mb-5 text-sm uppercase tracking-widest text-gray-500">
              Studio
            </p>

            <p className="text-lg leading-8 text-gray-700">
              Linienstrasse 144
              <br />
              10115 Berlin
            </p>
          </div>

          {/* FAQ */}
          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-6
              rounded-full
              bg-orange-600
              px-7
              py-4
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-black
            "
          >
            Check the FAQ first

            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-xl
                text-black
                transition
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </button>

        </div>

      </div>
    </section>
  );
}

export default Contact;