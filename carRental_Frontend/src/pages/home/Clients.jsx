import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "aos/dist/aos.css";
import AOS from "aos";

const Clients = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const clients = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    logo: `https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg`,
    name: `Client ${i + 1}`,
    review: `This is a review from Client ${i + 1}. Amazing service and support!`,
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  }));

  return (
    <div className="bg-neutral-800 text-white py-20 md:py-28" id="clients">
      <div className="max-w-5xl mx-auto px-4 xl:px-0 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12" data-aos="fade-up">
          Our Clients
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          loop
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <div
                className="group bg-neutral-700 rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-yellow-500"
                data-aos="zoom-in"
              >
                <img
                  src={client.logo}
                  alt={`Client ${client.id}`}
                  className="mx-auto w-20 md:w-24 lg:w-32 xl:w-40 rounded-full"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg md:text-xl font-semibold">{client.name}</h3>
                  <p className="text-sm md:text-base text-neutral-300 mt-2 group-hover:text-black">
                    {client.review}
                  </p>
                  <div className="flex justify-center gap-1 mt-2 text-yellow-300 group-hover:text-black">
                    {[...Array(client.rating)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 md:w-5 md:h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.158 3.558h3.75c.969 0 1.371 1.24.588 1.81l-3.034 2.204 1.158 3.557c.3.922-.755 1.688-1.54 1.11L10 12.347l-3.034 2.203c-.785.578-1.839-.188-1.54-1.11l1.158-3.557-3.034-2.204c-.783-.57-.38-1.81.588-1.81h3.75l1.158-3.558z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Clients;
