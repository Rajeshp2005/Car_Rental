import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/book/${car._id}`);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        {car.isAvailable && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
            Available
          </span>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
          <span className="text-lg font-bold text-blue-600">${car.price}/day</span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="mr-2">🚗</span> {car.type}
          </p>
          <p className="flex items-center">
            <span className="mr-2">⚡</span> {car.transmission}
          </p>
          <p className="flex items-center">
            <span className="mr-2">💺</span> {car.seats} Seats
          </p>
        </div>
        
        <button
          onClick={handleBooking}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;