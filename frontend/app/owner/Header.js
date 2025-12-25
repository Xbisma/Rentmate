'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import API from '../../services/api';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';

export default function Header({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(notif =>
        notif._id === id ? { ...notif, isRead: true } : notif
      ));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    
    // Redirect to login page
    router.push('/auth/login');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            RentMate
          </Link>
          
          {/* Right side - Add Property, Notifications, Logout */}
          <div className="flex items-center space-x-4">
            {/* Add Property Button */}
            <Link 
              href="/owner/properties/add" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add property
            </Link>
            
            {/* Notifications Bell Icon */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 relative"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C10.896 2 10 2.896 10 4v2.172C7.782 6.743 6 8.818 6 11v5l-2 2v1h16v-1l-2-2v-5c0-2.182-1.782-4.257-4-4.828V4c0-1.104-.896-2-2-2zM8.5 18c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5H8.5z" />
                </svg>
                {/* Notification badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification._id} 
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification._id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Logout Icon */}
            <button 
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={handleLogout}
              title="Logout"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}