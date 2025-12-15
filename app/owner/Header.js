'use client';
import Link from 'next/link';

export default function Header({ children }) {
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
            <button className="p-2 text-gray-600 hover:text-gray-800 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.858 4.858A9.969 9.969 0 012 12c0 2.524.952 4.825 2.515 6.572C6.078 20.304 8.839 21.5 12 21.5s5.922-1.196 7.485-2.928A9.969 9.969 0 0122 12a9.969 9.969 0 01-2.515-6.572C17.922 3.696 15.161 2.5 12 2.5S6.078 3.696 4.858 4.858z" />
              </svg>
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Logout Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-800">
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