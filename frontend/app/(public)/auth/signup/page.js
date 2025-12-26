'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { registerUser, loginUser } from "../../../../services/authService";
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    phone: '',
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      console.log('Attempting registration with:', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: formData.userType
      });

      // Register the user
      const registerData = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.userType
      });

      console.log('Registration response:', registerData);

      // Auto-login after successful registration
      const loginData = await loginUser({
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });

      console.log('Auto-login response:', loginData);

      // Store user data
      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("userType", formData.userType);
        
        if (loginData.user) {
          localStorage.setItem("userId", loginData.user._id || loginData.user.id);
          localStorage.setItem("userName", loginData.user.name || loginData.user.email);
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
        alert("Registration successful but auto-login failed. Please login manually.");
        router.push("/auth/login");
      }

    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 pt-20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-600 text-center mb-8">Join Rentmate and find your dream home</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your full name"
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your phone number"
            />
          </div>

          {/* User Type Selection for Signup */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">I want to:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('tenant')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'tenant' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="text-lg">🏠</div>
                <div className="text-sm font-semibold">Find Properties</div>
                <div className="text-xs text-gray-500">Tenant</div>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('owner')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'owner' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="text-lg">🔑</div>
                <div className="text-sm font-semibold">List Properties</div>
                <div className="text-xs text-gray-500">Owner</div>
              </button>
            </div>
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Confirm your password"
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Account
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login here
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
  );
}