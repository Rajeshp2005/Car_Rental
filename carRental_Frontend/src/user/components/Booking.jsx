import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../pages/auth/AuthContext';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import LocationSelect from './LocationSelect';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../../components/Navbar';

const carCategories = {
  standard: { base: 50, multiplier: 1 },
  premium: { base: 100, multiplier: 1.5 },
  luxury: { base: 200, multiplier: 2 }
};

const timeSlots = [
  { id: 1, time: '00:00' },
  { id: 2, time: '01:00' },
  { id: 3, time: '02:00' },
  { id: 4, time: '03:00' },
  { id: 5, time: '04:00' },
  { id: 6, time: '05:00' },
  { id: 7, time: '06:00' },
  { id: 8, time: '07:00' },
  { id: 9, time: '08:00' },
  { id: 10, time: '09:00' },
  { id: 11, time: '10:00' },
  { id: 12, time: '11:00' },
  { id: 13, time: '12:00' },
  { id: 14, time: '13:00' },
  { id: 15, time: '14:00' },
  { id: 16, time: '15:00' },
  { id: 17, time: '16:00' },
  { id: 18, time: '17:00' },
  { id: 19, time: '18:00' },
  { id: 20, time: '19:00' },
  { id: 21, time: '20:00' },
  { id: 22, time: '21:00' },
  { id: 23, time: '22:00' },
  { id: 24, time: '23:00' }
];

const Booking = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupCoords: null,
    dropoffLocation: '',
    dropoffCoords: null,
    pickupDate: null,
    dropoffDate: null,
    pickupTime: '',
    dropoffTime: '',
  });
  const [selectedCar, setSelectedCar] = useState({
    make: 'Default Car',
    model: 'Model',
    pricePerDay: 50,
    image: '/default-car.jpg',
    description: 'Loading car details...'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { carId } = useParams();
  const { user } = useAuth();

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.dropoffDate) return 0;
    return Math.ceil(
      (formData.dropoffDate - formData.pickupDate) / (1000 * 60 * 60 * 24)
    );
  };

  const isNightRate = () => {
    const pickupHour = parseInt(formData.pickupTime?.split(':')[0] || '0');
    return pickupHour >= 22 || pickupHour <= 6;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!carId) {
          setIsLoading(false);
          return;
        }
        const response = await api.get(`/cars/${carId}`);
        if (response.data) {
          setSelectedCar({
            ...response.data,
            category: response.data.category || 'standard',
            features: {
              safety: response.data.safety || 'Standard Safety',
              ...response.data.features
            },
            transmission: response.data.transmission || 'Automatic',
            seats: response.data.seats || 4
          });
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Failed to load car details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  useEffect(() => {
    // Update total price whenever relevant fields change
    const price = calculatePrice();
    setTotalPrice(price);
  }, [formData.pickupDate, formData.dropoffDate, formData.pickupTime, selectedCar]);

  const calculatePrice = () => {
    if (!formData.pickupDate || !formData.dropoffDate || !selectedCar) return 0;
    
    const days = Math.ceil(
      (formData.dropoffDate - formData.pickupDate) / (1000 * 60 * 60 * 24)
    );
    
    const categoryPrice = carCategories[selectedCar.category] || carCategories.standard;
    const basePrice = categoryPrice.base * categoryPrice.multiplier;
    
    // Add time-based pricing
    let timeMultiplier = 1;
    const pickupHour = parseInt(formData.pickupTime.split(':')[0]);
    if (pickupHour >= 22 || pickupHour <= 6) {
      timeMultiplier = 1.2; // Night rate
    }
    
    return Math.round(days * basePrice * timeMultiplier);
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in first!");
      return navigate("/user/signin");
    }

    if (!formData.pickupCoords || !formData.dropoffCoords) {
      toast.error("Please select locations on the map");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/bookings', {
        ...formData,
        carId: selectedCar._id,
        userId: user._id,
        totalPrice,
        pickupCoords: formData.pickupCoords,
        dropoffCoords: formData.dropoffCoords
      });
      toast.success('Booking successful!');
      navigate('/userhome');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {selectedCar ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <motion.div
                    className="space-y-6"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800">
                      Book {selectedCar.make} {selectedCar.model}
                    </h2>
                    <img
                      src={selectedCar.image}
                      alt={`${selectedCar.make} ${selectedCar.model}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedCar.pricePerDay}/day
                      </p>
                      <p className="text-gray-600">{selectedCar.description}</p>
                    </div>
                  </motion.div>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Pickup Location
                        </label>
                        <LocationSelect
                          type="Pickup"
                          value={formData.pickupLocation}
                          onChange={(location) => handleInputChange('pickupLocation', location)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Dropoff Location
                        </label>
                        <LocationSelect
                          type="Dropoff"
                          value={formData.dropoffLocation}
                          onChange={(location) => handleInputChange('dropoffLocation', location)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Pickup Date & Time
                          </label>
                          <div className="space-y-2">
                            <DatePicker
                              selected={formData.pickupDate}
                              onChange={(date) => handleInputChange('pickupDate', date)}
                              minDate={new Date()}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                            <select
                              value={formData.pickupTime}
                              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select Time</option>
                              {timeSlots.map(slot => (
                                <option key={slot.id} value={slot.time}>{slot.time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Dropoff Date & Time
                          </label>
                          <div className="space-y-2">
                            <DatePicker
                              selected={formData.dropoffDate}
                              onChange={(date) => handleInputChange('dropoffDate', date)}
                              minDate={formData.pickupDate || new Date()}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                            <select
                              value={formData.dropoffTime}
                              onChange={(e) => handleInputChange('dropoffTime', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select Time</option>
                              {timeSlots.map(slot => (
                                <option key={slot.id} value={slot.time}>{slot.time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Base Rate ({selectedCar.category})</span>
                        <span>${carCategories[selectedCar.category]?.base || 0}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span>{calculateDays()} days</span>
                      </div>
                      {isNightRate() && (
                        <div className="flex justify-between text-yellow-600">
                          <span>Night Rate Applied</span>
                          <span>+20%</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Price</span>
                        <span className="text-blue-600">${calculatePrice()}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Car Features</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span>⚡</span>
                          <span>{selectedCar.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🛡️</span>
                          <span>{selectedCar.features?.safety}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💺</span>
                          <span>{selectedCar.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🚘</span>
                          <span>{selectedCar.category}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </motion.form>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Booking;