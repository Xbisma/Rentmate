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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Clear error when user types
  };

  const handleUserTypeChange = (type) => {
    setFormData({
      ...formData,
      userType: type
    });
    setError(''); // Clear error when user changes type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', {
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });

      // Login with userType for backend validation
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
        userType: formData.userType  // Send userType to backend
      });

      console.log('Full login response:', data);
      
      // Check what the backend actually returns
      console.log('User data from backend:', data.user);
      console.log('User type from backend:', data.user?.userType || data.userType);

      // Method 1: Try to get user type from different possible locations
      let returnedUserType = null;
      
      if (data.user?.userType) {
        returnedUserType = data.user.userType;
      } else if (data.userType) {
        returnedUserType = data.userType;
      } else if (data.user?.role) {
        returnedUserType = data.user.role;
      } else if (data.role) {
        returnedUserType = data.role;
      } else if (data.user?.isOwner !== undefined) {
        returnedUserType = data.user.isOwner ? 'owner' : 'tenant';
      } else if (data.isOwner !== undefined) {
        returnedUserType = data.isOwner ? 'owner' : 'tenant';
      }
      
      console.log('Determined user type:', returnedUserType);
      
      // If we can't determine user type, skip the validation for now
      if (!returnedUserType) {
        console.warn('User type not found in response, skipping validation');
        // Continue with the user's selected type
        returnedUserType = formData.userType;
      }
      
      // IMPORTANT: Verify that the returned user type matches what was selected
      // But be more flexible - check if they're essentially the same
      const normalizedSelected = formData.userType.toLowerCase();
      const normalizedReturned = returnedUserType.toLowerCase();
      
      if (normalizedReturned !== normalizedSelected) {
        // User tried to login with wrong user type
        const correctType = normalizedReturned === 'tenant' ? 'Tenant' : 'Owner';
        const wrongType = normalizedSelected === 'tenant' ? 'Tenant' : 'Owner';
        throw new Error(`This email is registered as a ${correctType}. Please login as a ${correctType}.`);
      }

      // Store user data
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", returnedUserType);
        
        // If your backend returns user info
        if (data.user) {
          localStorage.setItem("userId", data.user._id || data.user.id);
          localStorage.setItem("userName", data.user.name || data.user.email);
          localStorage.setItem("userEmail", data.user.email);
        }

        console.log('Redirecting to:', returnedUserType === 'tenant' ? '/tenant/dashboard' : '/owner/dashboard');
        
        // Redirect based on user type
        if (returnedUserType === 'tenant') {
          router.push("/tenant/dashboard");
        } else if (returnedUserType === 'owner') {
          router.push("/owner/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Login successful but no token received");
      }

    } catch (err) {
      console.error('Login error:', err);
      
      // More specific error handling
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        setError("Account not found. Please check your email or sign up.");
      } else {
        const errorMessage = err.response?.data?.message || 
                            err.response?.data?.error ||
                            err.message || 
                            "Login failed. Please check your credentials.";
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
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
        
        {/* Display error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
          >
            ⚠️ {error}
          </motion.div>
        )}
        
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {/* User Type Selection */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('tenant')}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'tenant' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                🏠 Tenant
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('owner')}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === 'owner' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                🔑 Owner
              </button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.03 } : {}}
            whileTap={!isLoading ? { scale: 0.97 } : {}}
            className={`w-full font-semibold py-3 rounded-lg transition-all shadow-lg ${formData.userType === 'tenant'  ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-blue-300' : 'bg-gradient-to-r from-emerald-600 to-amber-500 hover:shadow-emerald-300'} text-white ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login to Continue'
            )}
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