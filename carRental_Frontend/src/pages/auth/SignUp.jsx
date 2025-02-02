import React, { useState } from 'react';
import api  from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput'; // Import reusable component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loader
    try {
      const response = await api.post('/users/signup', { name, email, password });
      toast.success('Signup successful! Redirecting...');
      setTimeout(() => {
        navigate('/auth/signin'); // Redirect to sign-in page on success
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please check your details.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-400">
      <div className="bg-slate-300 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
          />
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-bold rounded-lg transition ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full mr-2"></div>
                  Signing Up...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
