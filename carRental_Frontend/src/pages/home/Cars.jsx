import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '/src/pages/auth/AuthContext'; // Import AuthContext

const Cars = ({ onSelectCar }) => {
  const navigate = useNavigate();
 

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Smooth easing for animations
      once: false, // Ensures animations run only once on scroll
    });
  }, []);

  const carData = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      brand: "Tesla Model S",
      price: "$150/day",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      brand: "BMW X5",
      price: "$200/day",
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      brand: "Mercedes-Benz GLE",
      price: "$250/day",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      brand: "Audi A8",
      price: "$180/day",
    },
  ];

  const handleBookNow = (car) => {
    onSelectCar(car);
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      navigate('/auth/signin');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-28" id="cars">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <h2
          className="text-4xl font-extrabold text-center mb-12 text-yellow-400"
          data-aos="fade-up"
        >
          Available Cars for Booking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carData.map((car, index) => (
            <div
              key={car.id}
              data-aos="fade-up"
              data-aos-delay={index * 100} // Staggered animation for each card
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
            >
              <img
                src={car.image}
                alt={car.brand}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                  {car.brand}
                </h3>
                <p className="text-lg font-medium text-neutral-400 mb-4">
                  {car.price}
                </p>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg w-full transition duration-300"
                  onClick={() => handleBookNow(car)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
