// src/admin/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminDashboard = () => {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    title: '',
    description: '',
    images: [],
    price: '',
    isFeatured: false
  });

  // Fetch users and cars on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, carsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/cars')
        ]);
        setUsers(usersRes.data);
        setCars(carsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle user blocking
  const handleBlockUser = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/block`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      ));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  // Handle car submission
  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newCar.title);
      formData.append('description', newCar.description);
      formData.append('price', newCar.price);
      formData.append('isFeatured', newCar.isFeatured);
      newCar.images.forEach(image => {
        formData.append('images', image);
      });

      const response = await api.post('/admin/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setCars([...cars, response.data]);
      setNewCar({
        title: '',
        description: '',
        images: [],
        price: '',
        isFeatured: false
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* User Management Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className={`px-4 py-2 text-sm rounded-md 
                          ${user.isBlocked 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-red-500 hover:bg-red-600 text-white'}`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Car/Blog Management Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Cars/Blog Posts</h2>
          
          {/* Add New Car Form */}
          <form onSubmit={handleAddCar} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newCar.title}
                  onChange={(e) => setNewCar({...newCar, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={newCar.price}
                  onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCar.description}
                  onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setNewCar({...newCar, images: [...e.target.files]})}
                  className="w-full px-3 py-2 border rounded-md"
                  accept="image/*"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newCar.isFeatured}
                    onChange={(e) => setNewCar({...newCar, isFeatured: e.target.checked})}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="text-sm text-gray-700">Featured Post</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add New Car/Blog Post
            </button>
          </form>

          {/* Existing Cars/Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <div key={car._id} className="bg-gray-50 rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  {car.images[0] && (
                    <img 
                      src={car.images[0]} 
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {car.isFeatured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{car.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{car.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-bold">${car.price}</span>
                    <button className="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;