import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Cars from "./Cars";

const Booking = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="bg-neutral-900 text-white py-24" id="booking">
      <Cars/>
      <div className="max-w-4xl mx-auto px-4 xl:px-0 text-center">
        <h2
          className="text-4xl font-bold"
          data-aos="fade-up"
        >
          Book Your Ride
        </h2>
        <p
          className="mt-4 text-neutral-400 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Reserve your preferred vehicle in just a few clicks.
        </p>
        <form
          className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <input
            type="text"
            placeholder="Pickup Location"
            className="bg-neutral-800 p-4 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Dropoff Location"
            className="bg-neutral-800 p-4 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="date"
            className="bg-neutral-800 p-4 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="col-span-full sm:col-span-2 bg-yellow-500 text-black p-4 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
