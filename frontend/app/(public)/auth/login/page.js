'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { loginUser } from "../../../../services/authService";
import Link from 'next/link';
import AuthSideVisual from '../../../components/AuthSideVisual';


export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'tenant' // 'tenant' or 'owner'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'owner' : 'tenant') : value
    });
  };

  const handleUserTypeChange = (type) => {
    setFormData({
      ...formData,
      userType: type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', {
        email: formData.email,
        password: formData.password
      });

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
        userType: formData.userType  // Add userType to login request if needed
      });

      console.log('Login response:', data);

      // Store user data
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", formData.userType);
        
        // If your backend returns user info
        if (data.user) {
          localStorage.setItem("userId", data.user._id || data.user.id);
          localStorage.setItem("userName", data.user.name || data.user.email);
        }

        // Redirect based on user type
        if (formData.userType === 'tenant') {
          router.push("/tenant/dashboard");
        } else if (formData.userType === 'owner') {
          router.push("/owner/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert("Login successful but no token received");
      }

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Login failed. Please check your credentials.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex">
      <AuthSideVisual variant={formData.userType} />
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Login to Rentmate</h1>
        <p className="text-gray-600 text-center mb-8">Contact property owners and save your favorites</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          {/* User Type Selection */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('tenant')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'tenant' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                🏠 Tenant
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('owner')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'owner' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                🔑 Owner
              </button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full font-semibold py-3 rounded-lg transition-all shadow-lg ${formData.userType === 'tenant'  ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-blue-300' : 'bg-gradient-to-r from-emerald-600 to-amber-500 hover:shadow-emerald-300'} text-white`}
          >
            Login to Continue
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up here
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            <Link 
              href="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}